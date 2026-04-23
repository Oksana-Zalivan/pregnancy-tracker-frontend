import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <header>Main Header</header>
      <aside>Sidebar</aside>
      <nav>Breadcrumbs</nav>
      <main>{children}</main>
    </div>
  );
}
