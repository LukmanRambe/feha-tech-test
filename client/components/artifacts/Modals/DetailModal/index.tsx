import { SetStateAction, useEffect } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import useRemoteGetTodo from '@/hooks/remote/useRemoteGetTodo';
import { formatDate } from '@/utils/formatDate';

import Loading from '../../Loading';

type DetailModalPropsType = {
  setModal: React.Dispatch<
    SetStateAction<{
      type: string;
      isShown: boolean;
    }>
  >;
  todoId: number | null;
  setTodoId: React.Dispatch<SetStateAction<number | null>>;
};

const DetailModal: React.FC<DetailModalPropsType> = ({
  setModal,
  todoId,
  setTodoId,
}) => {
  const { data, isFetching, refetch } = useRemoteGetTodo(todoId);

  useEffect(() => {
    refetch();
  }, [todoId]);

  return (
    <article className="absolute bg-white w-[calc(100%-1.5rem)] sm:max-w-md p-6 rounded-md">
      {isFetching ? (
        <span className="flex justify-center items-center w-full h-full min-h-[200px]">
          <Loading size={14} />
        </span>
      ) : (
        <>
          <section className="flex justify-between items-center gap-5 mb-5">
            <h4 className="text-xl text-blue-700 font-semibold w-full">
              Detail Todo
            </h4>

            <button
              type="button"
              onClick={() => {
                setTodoId(null);
                setModal({
                  type: '',
                  isShown: false,
                });
              }}
              className="bg-transparent w-fit text-gray-500 hover:text-gray-600 active:text-gray-700 border-none outline-none font-medium tracking-wide transition-all duration-75 ease-in-out"
            >
              <AiOutlineClose />
            </button>
          </section>

          <article className="flex justify-between items-center gap-5 mb-1">
            <h3 className="font-semibold text-lg capitalize w-fit">
              {data?.name}
            </h3>
          </article>

          <span className="text-sm text-gray-400 tracking-wide">
            {data && formatDate(data.createdAt)}
          </span>

          <p className="mt-3 break-words">{data?.description}</p>
        </>
      )}
    </article>
  );
};

export default DetailModal;
