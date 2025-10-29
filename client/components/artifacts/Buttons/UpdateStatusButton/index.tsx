import { useContext, useEffect } from 'react';

import { BiCheck } from 'react-icons/bi';

import { LayoutContext } from '@/context/LayoutContext';
import { useMutate } from '@/hooks/useMutate';
import type { TodoType } from '@/ts/types/main/Todo';

type UpdateStatusButtonPropsType = {
  todo: TodoType;
  refetch: () => void;
};

const UpdateStatusButton: React.FC<UpdateStatusButtonPropsType> = ({
  todo,
  refetch,
}) => {
  const { setToast } = useContext(LayoutContext);

  const updateTodoStatus = useMutate({
    url: `/todos/${todo.id}`,
    method: 'PATCH',
    mutationKey: 'updateTodoStatus',
    reqBody: {
      isComplete: !todo.isComplete,
    },
  });

  const handleUpdateTodoStatus = async () => {
    updateTodoStatus.mutate();
  };

  useEffect(() => {
    if (updateTodoStatus.status === 'success') {
      if (updateTodoStatus.data?.status === 200) {
        refetch();

        setToast({
          type: 'success',
          message: 'To Do Status Updated',
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
    } else if (updateTodoStatus.status === 'error') {
      setToast({
        type: 'error',
        message: 'Failed to Update To Do Status',
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
  }, [updateTodoStatus.status]);

  return (
    <button
      type="button"
      onClick={handleUpdateTodoStatus}
      title={`Update To Do Status - ${todo.name}`}
      className={`border-[3px] rounded-md h-fit group hover:cursor-pointer hover:border-green-500 focus:border-green-600 active:border-green-700 hover:bg-green-500 focus:bg-green-600 active:bg-green-700 transition-all ease-in-out duration-100 outline-none ${
        todo.isComplete
          ? 'bg-green-500 border-green-500'
          : 'bg-white border-gray-500'
      }`}
    >
      <BiCheck
        className={`flex-shrink-0 w-[17px] h-[17px] group-hover:cursor-pointer group-hover:text-white group-focus:text-white group-active:text-white transition-all ease-in-out duration-100 ${
          todo.isComplete ? 'text-white' : 'text-gray-500'
        }`}
      />
    </button>
  );
};

export default UpdateStatusButton;
