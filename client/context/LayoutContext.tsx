import { ReactNode, createContext, useEffect, useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { fetchAxios } from '@/libs/fetchAxios';
import type { LayoutContextData } from '@/ts/types/context/LayoutContext';
import { Toast } from '@/ts/types/main/Toast';
import type { User } from '@/ts/types/main/User';
import type {
  LoginFormValues,
  SignUpFormValues,
} from '@/ts/types/schema/AuthSchema';

type LayoutProviderProps = {
  children: ReactNode;
};

export const LayoutContext = createContext<LayoutContextData>({
  toast: {
    type: '',
    message: '',
    isShown: false,
  },
  setToast: () => ({
    type: '',
    message: '',
    isShown: false,
  }),
  setSignUpFormValues: () => {},
  setLoginFormValues: () => {},
  signUpFormValues: {
    email: '',
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
  },
  loginFormValues: { username: '', password: '' },
  signUp: () => null,
  login: () => null,
  logout: () => null,
  errorMessage: '',
  isLoading: false,
  isDrawerOpen: false,
  setIsDrawerOpen: () => false,
});

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast>({
    type: '',
    message: '',
    isShown: false,
  });
  const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormValues>({
    email: '',
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loginFormValues, setLoginFormValues] = useState<LoginFormValues>({
    username: '',
    password: '',
  });

  const executeSignUp = useMutation(
    'signUp',
    async () => {
      return fetchAxios.post('/auth/signup', {
        email: signUpFormValues.email,
        fullname: signUpFormValues.fullname,
        username: signUpFormValues.username,
        password: signUpFormValues.password,
      });
    },
    {
      onSuccess: async (res) => {
        setIsLoading(true);

        if (res.status === 201) {
          setIsLoading(false);
          setToast({
            type: 'success',
            message: 'Sign Up Success',
            isShown: true,
          });

          setTimeout(() => {
            setToast({
              type: '',
              message: '',
              isShown: false,
            });

            router.push('/auth/signin');
          }, 2000);
        }
      },
      onError: async (
        error: AxiosError<{ errors: { password: string; username: string } }>
      ) => {
        if (error.response) {
          setIsLoading(false);

          const message = error.response?.data?.errors;

          if (message.username) {
            setErrorMessage(message.username);
          } else if (message.password) {
            setErrorMessage(message.password);
          }
        }
      },
    }
  );

  const executeLogin = useMutation(
    'signin',
    async () => {
      return fetchAxios.post('/auth/signin', {
        identifier: loginFormValues.username,
        password: loginFormValues.password,
      });
    },
    {
      onSuccess: async (res: AxiosResponse<{ token: string; user: User }>) => {
        setIsLoading(true);

        if (res.status === 200) {
          Cookies.set('xbt', res.data?.token);

          setToast({
            type: 'success',
            message: 'Login Success',
            isShown: true,
          });

          setTimeout(() => {
            setIsLoading(false);
            setToast({
              type: '',
              message: '',
              isShown: false,
            });

            router.prefetch('/todo');
            router.push('/todo');
          }, 2000);
        }
      },
      onError: async (error: AxiosError<{ errors: string }>) => {
        if (error.response?.status === 401) {
          const message = error.response?.data?.errors;

          setIsLoading(false);
          setErrorMessage(message);
        } else {
          setErrorMessage(error.message);
        }
      },
    }
  );

  const signUp = async () => {
    executeSignUp.mutate();
  };

  const login = async () => {
    executeLogin.mutate();
  };

  const logout = async () => {
    setIsLoading(true);

    Cookies.remove('xbt');
    setToast({
      type: 'success',
      message: 'Logout Success',
      isShown: true,
    });

    setTimeout(() => {
      setIsLoading(false);
      setToast({
        type: '',
        message: '',
        isShown: false,
      });

      router.replace('/auth/signin');
    }, 2000);
  };

  return (
    <LayoutContext.Provider
      value={{
        toast,
        setToast,
        setSignUpFormValues,
        setLoginFormValues,
        signUpFormValues,
        loginFormValues,
        signUp,
        login,
        logout,
        errorMessage,
        isLoading,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
