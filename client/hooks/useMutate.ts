import { useMutation } from 'react-query';

import { fetchAxios } from '@/libs/fetchAxios';

type UseMutateParams = {
  url: string;
  method: string;
  mutationKey: string;
  reqBody?: {};
};

export const useMutate = ({
  url,
  method,
  mutationKey,
  reqBody,
}: UseMutateParams) => {
  return useMutation(
    async () => fetchAxios.request({ method, url, data: reqBody }),
    {
      mutationKey,
    }
  );
};
