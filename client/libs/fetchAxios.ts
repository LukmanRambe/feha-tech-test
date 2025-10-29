import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:4000/api/';

const fetchAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

fetchAxios.interceptors.request.use((config): InternalAxiosRequestConfig => {
  if (typeof window !== 'undefined') {
    if (Cookies.get('xbt')) {
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${Cookies.get('xbt')}`
      );
    }
  }

  return config;
}, undefined);

fetchAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      Cookies.remove('xbt');

      window.location.href = '/auth/signin';
    }

    return Promise.reject(err);
  }
);

export { fetchAxios };
