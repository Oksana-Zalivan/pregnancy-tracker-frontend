'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setAuthLoading(true);
        setUser(null);

        const response = await fetch('/api/users/current', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const result = await response.json();

        setUser(result.data ?? null);
      } catch (error) {
        console.error('AuthProvider error:', error);

        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchCurrentUser();
  }, [setUser, setAuthLoading]);

  return <>{children}</>;
}
