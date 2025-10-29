import { useContext, useEffect, useState } from 'react';

import Head from 'next/head';

import Modals from '@/components/artifacts/Modals';
import Toast from '@/components/artifacts/Toast';
import Layout from '@/components/Layout';
import TodoTable from '@/components/main/TodoTable';
import { LayoutContext } from '@/context/LayoutContext';
import useRemoteGetAllTodos from '@/hooks/remote/useRemoteGetAllTodos';
import type { NextPageWithLayout } from '@/ts/types/NextPageWithLayout';

const Todos: NextPageWithLayout = () => {
  const { toast } = useContext(LayoutContext);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [modal, setModal] = useState<{ type: string; isShown: boolean }>({
    type: '',
    isShown: false,
  });
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);
  const { data, refetch, isFetching } = useRemoteGetAllTodos({
    isComplete: false,
    sort: 'id DESC',
    offset: offset,
    limit: dataLimit,
  });

  useEffect(() => {
    if (pageIndex !== 1) {
      setOffset((pageIndex - 1) * dataLimit);
    } else {
      setOffset(0);
    }
  }, [pageIndex, dataLimit]);

  return (
    <>
      <Head>
        <title>Qubic | To Do</title>
      </Head>

      {toast.isShown && <Toast type={toast.type} message={toast.message} />}

      <TodoTable
        tableName="To Do"
        data={data}
        setTodoId={setTodoId}
        setModal={setModal}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        setDataLimit={setDataLimit}
        isFetching={isFetching}
        refetch={refetch}
      />

      <Modals
        modal={modal}
        setModal={setModal}
        todoId={todoId}
        setTodoId={setTodoId}
        refetch={refetch}
      />
    </>
  );
};

Todos.getLayout = (page) => <Layout>{page}</Layout>;

export default Todos;
