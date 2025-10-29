type CreateButtonPropsType = {
  setModal: React.Dispatch<
    React.SetStateAction<{ type: string; isShown: boolean }>
  >;
};

const CreateButton: React.FC<CreateButtonPropsType> = ({ setModal }) => {
  return (
    <button
      onClick={() =>
        setModal({
          type: 'create-modal',
          isShown: true,
        })
      }
      className="bg-blue-500 p-2 w-32 rounded-md focus:outline-none hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold text-white tracking-wide transition-all duration-75 ease-in-out"
    >
      + Create Todo
    </button>
  );
};

export default CreateButton;
