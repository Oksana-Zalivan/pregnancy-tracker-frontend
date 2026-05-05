"use client";

import { useState } from "react";
<<<<<<< HEAD:src/components/layout/main-layout/main-layout.tsx
import Header from "@/components/layout/header/header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import Breadcrumbs from "@/components/layout/breadcrumbs/breadcrumbs";
import css from "@/components/layout/main-layout/main-layout.module.css";
=======
>>>>>>> effde4e61e93d4e4a3e416e7a95924a4c7b81d5a:src/components/layout/MainLayout/MainLayout.tsx
import type { ReactNode } from "react";

import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import Breadcrumbs from "@/components/layout/breadcrumbs/breadcrumbs";

import css from "./MainLayout.module.css";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={css.layout}>
      <Header onOpenMenu={openMobileMenu} />

      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
      />

      <div className={css.contentWrapper}>
        <Breadcrumbs />
        <main className={css.main}>{children}</main>
      </div>
    </div>
  );
}
