import { BiTrash } from 'react-icons/bi';

import type { TodoType } from '@/ts/types/main/Todo';

type DeleteButtonPropsType = {
  todo: TodoType;
  setTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ type: string; isShown: boolean }>
  >;
};

const DeleteButton: React.FC<DeleteButtonPropsType> = ({
  todo,
  setTodoId,
  setModal,
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        setTodoId(todo.id);
        setModal({
          type: 'delete-modal',
          isShown: true,
        });
      }}
      title={`Delete To Do - ${todo.name}`}
      className="outline-none transition duration-75 hover:cursor-pointer text-red-700 hover:text-red-800 focus:text-red-800 active:text-red-900"
    >
      <BiTrash className="flex-shrink-0 w-6 h-6" />
    </button>
  );
};

export default DeleteButton;
