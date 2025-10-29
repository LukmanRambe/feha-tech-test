import { ReactNode } from 'react';

import LayoutProvider from '@/context/LayoutContext';
import AuthProvider from '@/middleware/AuthProvider';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { UserProvider } from '@/context/UserContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <LayoutProvider>
        <UserProvider>
          <Navbar />
          <Sidebar />
          <main className="lg:pl-72 px-7 pt-24">{children}</main>
        </UserProvider>
      </LayoutProvider>
    </AuthProvider>
  );
};

export default Layout;
