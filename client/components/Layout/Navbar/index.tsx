import { useContext } from 'react';

import { MdMenu } from 'react-icons/md';

import { LayoutContext } from '@/context/LayoutContext';
import { UserContext } from '@/context/UserContext';

const Navbar: React.FC = () => {
  const { userData } = useContext(UserContext);
  const { isDrawerOpen, setIsDrawerOpen } = useContext(LayoutContext);

  return (
    <header className="flex justify-between items-center bg-white fixed top-0 w-full lg:pl-72 px-7 py-5 border-b-2">
      <article>
        <h2 className="font-bold text-2xl capitalize">
          {userData ? userData.fullname : 'John Doe'}
        </h2>

        <p className="text-sm tracking-wide text-gray-400">
          Let&apos;s be more productive! 👋
        </p>
      </article>

      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="block lg:hidden h-fit outline-none"
      >
        <MdMenu className="flex-shrink-0 w-6 h-6 text-black hover:cursor-pointer hover:text-blue-700 active:text-blue-800 focus:text-blue-700" />
      </button>
    </header>
  );
};

export default Navbar;
