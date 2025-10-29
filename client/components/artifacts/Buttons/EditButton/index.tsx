import { BiEdit } from 'react-icons/bi';

import type { TodoType } from '@/ts/types/main/Todo';

type EditButtonPropsType = {
  todo: TodoType;
  setTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ type: string; isShown: boolean }>
  >;
};

const EditButton: React.FC<EditButtonPropsType> = ({
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
          type: 'update-modal',
          isShown: true,
        });
      }}
      title={`Update To Do - ${todo.name}`}
      className="outline-none transition duration-75 hover:cursor-pointer text-blue-700 hover:text-blue-800 focus:text-blue-800 active:text-blue-900"
    >
      <BiEdit className="flex-shrink-0 w-6 h-6" />
    </button>
  );
};

export default EditButton;
