import { SetStateAction, useContext, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LayoutContext } from '@/context/LayoutContext';
import { useMutate } from '@/hooks/useMutate';
import type { CreateTodoFormValues } from '@/ts/types/schema/TodoSchema';
import { createTodoSchema } from '@/utils/schema/todoSchema';

import Loading from '../../Loading';

type CreateModalPropsType = {
  setModal: React.Dispatch<SetStateAction<{ type: string; isShown: boolean }>>;
  refetch: () => void;
};

const CreateModal: React.FC<CreateModalPropsType> = ({ setModal, refetch }) => {
  const { setToast } = useContext(LayoutContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTodoFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(createTodoSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const createTodo = useMutate({
    url: 'todos',
    method: 'POST',
    mutationKey: 'createTodo',
    reqBody: {
      name: watch('name'),
      description: watch('description'),
    },
  });

  const handleCreateTodo = async () => {
    createTodo.mutate();
  };

  useEffect(() => {
    if (createTodo.status === 'success') {
      if (createTodo.data?.status === 201) {
        setToast({
          type: 'success',
          message: 'To Do Created',
          isShown: true,
        });

        setTimeout(() => {
          refetch();

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
    } else if (createTodo.status === 'error') {
      setToast({
        type: 'error',
        message: 'Failed to Create To Do',
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
  }, [createTodo.status]);

  return (
    <article className="absolute bg-white w-[calc(100%-1.5rem)] sm:max-w-md p-6 rounded-md max-h-full">
      <h4 className="text-xl text-blue-700 font-semibold mb-5">Create Todo</h4>

      <form onSubmit={handleSubmit(handleCreateTodo)}>
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
            onClick={() => setModal({ type: '', isShown: false })}
            className="bg-transparent p-2 w-full rounded-md text-red-500 hover:text-red-600 active:text-red-700 border-none outline-none font-medium tracking-wide transition-all duration-75 ease-in-out"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={watch('name') === '' || watch('description') === ''}
            className="bg-blue-600 p-2 w-full rounded-md focus:outline-none hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold text-white tracking-wide transition-all duration-75 ease-in-out"
          >
            {createTodo.isLoading ? (
              <span className="flex w-full justify-center text-white">
                <Loading size={6} isButton />
              </span>
            ) : (
              'Create'
            )}
          </button>
        </article>
      </form>
    </article>
  );
};

export default CreateModal;
