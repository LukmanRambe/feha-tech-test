import { useQuery } from 'react-query';

import { fetchAxios } from '@/libs/fetchAxios';

export const useFetch = (url: string, queryKey: string | [string, {}]) => {
  return useQuery(queryKey, () => fetchAxios.get(url), {
    keepPreviousData: true,
    staleTime: 3600000,
  });
};
