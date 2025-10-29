'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('xbt');

    if (token) {
      if (router.pathname.includes('/auth')) {
        router.replace('/todo');
      }
    } else if (!token && !router.pathname.includes('/auth')) {
      router.replace('/auth/signin');
    }
  }, [router.pathname]);

  return <>{children}</>;
}
