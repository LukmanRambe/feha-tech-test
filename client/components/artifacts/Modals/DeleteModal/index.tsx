import { SetStateAction, useContext, useEffect } from 'react';

import { PiWarningCircleLight } from 'react-icons/pi';

import { LayoutContext } from '@/context/LayoutContext';
import { useMutate } from '@/hooks/useMutate';

import Loading from '../../Loading';

type DeleteModalPropsType = {
  setModal: React.Dispatch<
    SetStateAction<{
      type: string;
      isShown: boolean;
    }>
  >;
  todoId: number | null;
  setTodoId: React.Dispatch<SetStateAction<number | null>>;
  refetch: () => void;
};

const DeleteModal: React.FC<DeleteModalPropsType> = ({
  setModal,
  refetch,
  todoId,
  setTodoId,
}) => {
  const { setToast } = useContext(LayoutContext);
  const deleteTodo = useMutate({
    url: `/todos/${todoId}`,
    method: 'DELETE',
    mutationKey: 'deleteTodo',
  });

  const handleDeleteTodo = async () => {
    deleteTodo.mutate();
  };

  useEffect(() => {
    if (deleteTodo.status === 'success') {
      if (deleteTodo.data?.status === 204) {
        setToast({
          type: 'success',
          message: 'To Do Deleted',
          isShown: true,
        });

        setTimeout(() => {
          refetch();

          setTodoId(null);
          setToast({
            type: '',
            message: '',
            isShown: false,
          });
          setModal({
            type: '',
            isShown: false,
          });
        }, 2000);
      }
    } else if (deleteTodo.status === 'error') {
      setToast({
        type: 'error',
        message: 'Failed to Delete To Do',
        isShown: true,
      });

      setTimeout(() => {
        setToast({
          type: '',
          message: '',
          isShown: false,
        });
      }, 2000);
    }
  }, [deleteTodo.status]);

  return (
    <article className="absolute bg-white w-[calc(100%-1.5rem)] sm:max-w-md p-6 rounded-md">
      <section className="flex flex-col items-center gap-3">
        <PiWarningCircleLight className="flex-shrink-0 text-9xl text-yellow-400" />

        <article>
          <h4 className="text-3xl text-center text-[#595959] font-bold mb-2">
            Are you sure?
          </h4>
          <p>You won&apos;t be able to revert this!</p>
        </article>
      </section>

      <article className="flex justify-between mt-12 gap-4">
        <button
          type="button"
          onClick={() =>
            setModal({
              type: '',
              isShown: false,
            })
          }
          className="bg-transparent p-2 w-full rounded-md text-blue-500 hover:text-blue-600 active:text-blue-700 border-none outline-none font-medium tracking-wide transition-all duration-75 ease-in-out"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDeleteTodo}
          className="bg-red-600 p-2 w-full rounded-md focus:outline-none hover:bg-red-700 active:bg-red-800 disabled:bg-red-400 disabled:cursor-not-allowed font-semibold text-white tracking-wide transition-all duration-75 ease-in-out"
        >
          {deleteTodo.isLoading ? (
            <span className="flex w-full justify-center text-white">
              <Loading size={6} isButton />
            </span>
          ) : (
            'Delete'
          )}
        </button>
      </article>
    </article>
  );
};

export default DeleteModal;
