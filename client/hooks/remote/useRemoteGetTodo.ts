import { useMemo } from 'react';

import type { TodoType } from '@/ts/types/main/Todo';

import { useFetch } from '../useFetch';

const useRemoteGetTodo = (todoId: number | null) => {
  const url = todoId ? `/todos/${todoId}` : '';

  const { data, error, isFetching, refetch } = useFetch(url, [
    'getTodo',
    { todoId },
  ]);

  const newData = useMemo<TodoType | undefined>(() => data?.data?.data, [data]);

  return { data: newData, error, isFetching, refetch };
};

export default useRemoteGetTodo;
