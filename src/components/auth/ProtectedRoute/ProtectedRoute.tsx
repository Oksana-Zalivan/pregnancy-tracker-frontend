"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const hasToken =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (!hasToken) {
      router.replace("/auth/login");
    }
  }, [hasToken, router]);

  if (!hasToken) {
    return <p>Завантаження...</p>;
  }

  return <>{children}</>;
}
