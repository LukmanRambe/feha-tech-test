import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

type ToastProps = {
  type: '' | 'success' | 'error';
  message: string;
};

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <article className="fixed z-[99] top-10 right-10">
      <div
        className={`flex items-center w-full max-w-xs p-3 rounded-md shadow-md ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }  `}
        role="alert"
      >
        <span
          className={`inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-md ${
            type === 'success'
              ? 'text-green-500 bg-green-200'
              : 'text-red-500 bg-red-200'
          }`}
        >
          {type === 'success' ? <AiOutlineCheck /> : <AiOutlineClose />}
        </span>

        <article className="flex flex-col text-sm ml-3">
          <span
            className={`font-medium tracking-wide ${
              type === 'success' ? 'text-green-500 ' : 'text-red-500 '
            }`}
          >
            {type === 'success' ? 'Success' : 'Error'}
          </span>

          <span
            className={`font-normal tracking-wide ${
              type === 'success' ? 'text-green-500 ' : 'text-red-500 '
            }`}
          >
            {message}
          </span>
        </article>
      </div>
    </article>
  );
};

export default Toast;
