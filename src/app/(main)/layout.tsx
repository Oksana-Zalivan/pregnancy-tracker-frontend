import type { ReactNode } from 'react';
import MainLayout from '@/components/layout/MainLayout/MainLayout';

type MainLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: MainLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
