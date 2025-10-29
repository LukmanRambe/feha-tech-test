import type { TodoType } from '@/ts/types/main/Todo';
import { formatDate } from '@/utils/formatDate';

import ActionButtons from '../../artifacts/ActionButtons';
import UpdateStatusButton from '../../artifacts/Buttons/UpdateStatusButton';

type TodoPropsType = {
  todo: TodoType;
  setTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setModal: React.Dispatch<
    React.SetStateAction<{ type: string; isShown: boolean }>
  >;
  refetch: () => void;
};

const Todo: React.FC<TodoPropsType> = ({
  todo,
  setTodoId,
  setModal,
  refetch,
}) => {
  const handleDetail = () => {
    setTodoId(todo.id);
    setModal({
      type: 'detail-modal',
      isShown: true,
    });
  };

  return (
    <article key={todo.id} className="px-4 py-1 border-b">
      <article className="flex flex-col">
        <div className="flex justify-between items-center w-full">
          <UpdateStatusButton todo={todo} refetch={refetch} />

          <section
            onClick={handleDetail}
            className="w-full mx-4 hover:cursor-pointer group overflow-hidden"
            title={`To Do Detail - ${todo.name}`}
          >
            <h3
              className={`font-semibold text-lg tracking-wide capitalize w-fit group-hover:text-blue-700 group-active:text-blue-800 group-focus:text-blue-900 transition-all ease-in-out duration-100 ${
                todo.isComplete && 'line-through text-gray-700'
              }`}
            >
              {todo.name}
            </h3>

            <p
              className={`text-gray-500 text-base tracking-wide overflow-hidden line-clamp-1 break-words ${
                todo.isComplete && 'line-through'
              }`}
            >
              {todo.description}
            </p>

            <span className="text-xs text-gray-400 tracking-wide">
              {formatDate(todo.createdAt)}
            </span>
          </section>

          <ActionButtons
            todo={todo}
            setTodoId={setTodoId}
            setModal={setModal}
          />
        </div>
      </article>
    </article>
  );
};

export default Todo;
