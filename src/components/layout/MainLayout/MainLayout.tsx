"use client";

import { useState } from "react";
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import css from "@/components/layout/main-layout/Main-layout.module.css";
import type { ReactNode } from "react";

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
