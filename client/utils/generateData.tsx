import { CgProfile } from 'react-icons/cg';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { RiCalendarTodoFill } from 'react-icons/ri';

const classNames = 'flex-shrink-0 w-7 h-7 transition duration-75';
const sidebarMenus = [
  {
    name: 'To Do',
    href: '/todo',
    icon: <RiCalendarTodoFill className={classNames} />,
  },
  {
    name: 'Done',
    href: '/done',
    icon: <MdOutlineDownloadDone className={classNames} />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <CgProfile className={classNames} />,
  },
];

export { sidebarMenus };
