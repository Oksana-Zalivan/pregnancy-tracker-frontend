'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader } from '@/components/shared/Loader/Loader';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/auth/login');
    }
  }, [isAuthLoading, user, router]);

  if (isAuthLoading) {
    return <Loader fullScreen />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
