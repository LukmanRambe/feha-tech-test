import { SetStateAction, useContext, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LayoutContext } from '@/context/LayoutContext';
import useRemoteGetTodo from '@/hooks/remote/useRemoteGetTodo';
import { useMutate } from '@/hooks/useMutate';
import type { UpdateTodoFormValues } from '@/ts/types/schema/TodoSchema';
import { updateTodoSchema } from '@/utils/schema/todoSchema';

import Loading from '../../Loading';

type UpdateModalPropsType = {
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

const UpdateModal: React.FC<UpdateModalPropsType> = ({
  setModal,
  refetch,
  todoId,
  setTodoId,
}) => {
  const { setToast } = useContext(LayoutContext);
  const { data, isFetching, refetch: refetchTodo } = useRemoteGetTodo(todoId);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateTodoFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(updateTodoSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
      isComplete: data?.isComplete,
    },
  });

  const updateTodo = useMutate({
    url: `/todos/${todoId}`,
    method: 'PATCH',
    mutationKey: 'updateTodo',
    reqBody: {
      name: watch('name'),
      description: watch('description'),
      isComplete: data?.isComplete,
    },
  });

  const handleUpdateTodo = async () => {
    updateTodo.mutate();
  };

  useEffect(() => {
    if (updateTodo.status === 'success') {
      if (updateTodo.data?.status === 200) {
        setToast({
          type: 'success',
          message: 'To Do Updated',
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
    } else if (updateTodo.status === 'error') {
      setToast({
        type: 'error',
        message: 'Failed to Update To Do',
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
  }, [updateTodo.status]);

  useEffect(() => {
    if (todoId) {
      refetchTodo();

      if (data) {
        setValue('name', data.name);
        setValue('description', data.description);
      }
    }
  }, [data, todoId]);

  return (
    <article className="absolute bg-white w-[calc(100%-1.5rem)] sm:max-w-md p-6 rounded-md max-h-full">
      <h4 className="text-xl text-blue-700 font-semibold mb-5">Update Todo</h4>

      {isFetching ? (
        <span className="flex justify-center items-center w-full h-full min-h-[200px]">
          <Loading size={14} />
        </span>
      ) : (
        <form onSubmit={handleSubmit(handleUpdateTodo)}>
          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="name"
              className="tracking-wide font-medium text-blue-900"
            >
              Name
            </label>

            <input
              {...register('name')}
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              className="py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </article>

          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="description"
              className="tracking-wide font-medium text-blue-900"
            >
              Description
            </label>

            <textarea
              {...register('description')}
              id="description"
              name="description"
              cols={1}
              rows={7}
              placeholder="Description..."
              className="w-full py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600 resize-none"
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </article>

          <article className="flex justify-between mt-12 gap-4">
            <button
              type="button"
              onClick={() =>
                setModal({
                  type: '',
                  isShown: false,
                })
              }
              className="bg-transparent p-2 w-full rounded-md text-red-500 hover:text-red-600 active:text-red-700 border-none outline-none font-medium tracking-wide transition-all duration-75 ease-in-out"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={watch('name') === '' || watch('description') === ''}
              className="bg-blue-600 p-2 w-full rounded-md focus:outline-none hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold text-white tracking-wide transition-all duration-75 ease-in-out"
            >
              {updateTodo.isLoading ? (
                <span className="flex w-full justify-center text-white">
                  <Loading size={6} isButton />
                </span>
              ) : (
                'Update'
              )}
            </button>
          </article>
        </form>
      )}
    </article>
  );
};

export default UpdateModal;
