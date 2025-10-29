import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';
import DetailModal from './DetailModal';
import UpdateModal from './UpdateModal';

type ModalsPropsType = {
  modal: { type: string; isShown: boolean };
  setModal: React.Dispatch<
    React.SetStateAction<{ type: string; isShown: boolean }>
  >;
  todoId: number | null;
  setTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  refetch: () => void;
};

type ModalsType = {
  [key: string]: JSX.Element;
};

const Modals: React.FC<ModalsPropsType> = ({
  modal,
  setModal,
  todoId,
  setTodoId,
  refetch,
}) => {
  const modals: ModalsType = {
    'create-modal': <CreateModal setModal={setModal} refetch={refetch} />,
    'detail-modal': (
      <DetailModal setModal={setModal} todoId={todoId} setTodoId={setTodoId} />
    ),
    'update-modal': (
      <UpdateModal
        setModal={setModal}
        refetch={refetch}
        todoId={todoId}
        setTodoId={setTodoId}
      />
    ),
    'delete-modal': (
      <DeleteModal
        setModal={setModal}
        refetch={refetch}
        todoId={todoId}
        setTodoId={setTodoId}
      />
    ),
  };

  return (
    <>
      {modal.isShown && (
        <div
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full md:min-h-screen min-w-screen bg-black/50"
        >
          <section className="relative flex justify-center items-center bg-black/10 h-full w-full">
            {modals[modal.type]}
          </section>
        </div>
      )}
    </>
  );
};

export default Modals;
