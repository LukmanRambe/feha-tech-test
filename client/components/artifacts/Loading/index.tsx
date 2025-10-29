import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type LoadingPropsType = {
  size: number;
  isButton?: boolean;
};

const Loading: React.FC<LoadingPropsType> = ({ size, isButton }) => {
  return (
    <AiOutlineLoading3Quarters
      className={`h-${size} w-full animate-spin ${
        isButton ? 'text-white' : 'text-blue-600'
      }`}
    />
  );
};

export default Loading;
