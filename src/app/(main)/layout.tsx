import type { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute/ProtectedRoute";

type MainLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: MainLayoutProps) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  );
}
