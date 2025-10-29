import type { TodoType } from '@/ts/types/main/Todo';

import DeleteButton from '../Buttons/DeleteButton';
import EditButton from '../Buttons/EditButton';

type ActionButtonsPropsType = {
  todo: TodoType;
  setTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ type: string; isShown: boolean }>
  >;
};

const ActionButtons: React.FC<ActionButtonsPropsType> = ({
  todo,
  setTodoId,
  setModal,
}) => {
  const props = { todo, setTodoId, setModal };

  return (
    <div className="flex gap-3 items-center">
      {!todo.isComplete && <EditButton {...props} />}
      <DeleteButton {...props} />
    </div>
  );
};

export default ActionButtons;
