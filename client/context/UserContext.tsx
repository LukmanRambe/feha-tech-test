'use client';

import { createContext, useState, useEffect } from 'react';
import { fetchAxios } from '@/libs/fetchAxios';
import { useMutation } from 'react-query';
import { User } from '@/ts/types/main/User';
import { AxiosError } from 'axios';
import { UserContextType } from '@/ts/types/context/UserContext';

export const UserContext = createContext<UserContextType>({
  userData: {
    id: null,
    email: '',
    fullname: '',
    username: '',
  },
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<User>({
    id: null,
    email: '',
    fullname: '',
    username: '',
  });

  const executeRefreshUser = useMutation(
    'refreshUser',
    async () => {
      return fetchAxios.get('/user');
    },
    {
      onSuccess: async (res) => {
        if (res.status === 200) {
          setUserData(res.data?.data);
        }
      },
      onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
          throw new Error('Failed to get user data!');
        } else {
          throw new Error(error.message);
        }
      },
    }
  );

  const refreshUser = async () => {
    executeRefreshUser.mutate();
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
