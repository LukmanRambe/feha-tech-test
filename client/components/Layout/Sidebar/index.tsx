import { Fragment, useContext } from 'react';

import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';

import { LayoutContext } from '@/context/LayoutContext';
import { sidebarMenus } from '@/utils/generateData';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { logout, isDrawerOpen, setIsDrawerOpen } = useContext(LayoutContext);

  return (
    <>
      <Transition
        show={isDrawerOpen}
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-[49] lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      </Transition>

      <>
        <aside
          className={`fixed left-0 min-h-full bg-[#F8F8FB] z-49 py-5 px-7 w-full max-w-[250px] z-[50] lg:border-r-2 -translate-x-full lg:translate-x-0 transition lg:transition-none ease-in-out transform ${
            isDrawerOpen
              ? 'border-r-0 translate-x-0 duration-300'
              : '-translate-x-full duration-300'
          }`}
        >
          <h1 className="text-2xl font-bold text-blue-600 mb-10">Qubic Todo</h1>

          <section className="flex flex-col h-screen pb-12">
            <ul className="flex flex-col gap-3 w-full h-4/5">
              {sidebarMenus.map((menu) => (
                <li key={menu.href}>
                  <Link
                    role="list-item"
                    href={menu.href}
                    passHref
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center justify-start gap-3 active:text-blue-600 hover:text-blue-600 active:bg-blue-300/50 px-4 py-3 transition duration-75 ease-in-out cursor-pointer rounded-md ${
                      `${menu.href}` === router.pathname
                        ? 'text-blue-600 bg-blue-100 focus:bg-blue-200 focus:text-blue-600'
                        : 'text-[#84828A] hover:bg-blue-100 focus:bg-blue-200 focus:text-blue-600'
                    }`}
                  >
                    <span className="text-2xl">{menu.icon}</span>
                    <p className="font-semibold">{menu.name}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              role="button"
              aria-label="logout"
              className="w-full flex items-center justify-start gap-3 active:text-blue-600 hover:text-blue-600 hover:bg-blue-100 active:bg-blue-300/50 px-4 rounded-md py-3 transition duration-75 ease-in-out cursor-pointer text-[#84828A] focus:bg-blue-200 focus:text-blue-600 outline-none"
              onClick={() => logout()}
            >
              <span className="text-2xl">
                <BiLogOut className="flex-shrink-0 w-7 h-7 transition duration-75" />
              </span>
              <p className="font-semibold">Logout</p>
            </button>
          </section>
        </aside>
      </>
    </>
  );
};

export default Sidebar;
