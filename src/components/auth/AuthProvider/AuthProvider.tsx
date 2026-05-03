"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch("/api/users/current", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const result = await response.json();
        setUser(result.data ?? null);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    getCurrentUser();
  }, [setUser, setAuthLoading]);

  return <>{children}</>;
}
