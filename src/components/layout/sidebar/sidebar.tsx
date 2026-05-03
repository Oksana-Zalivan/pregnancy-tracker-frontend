"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import { navigationItems } from "@/lib/constants/navigation";
import { UserBar } from "@/auth/UserBar";
import { AuthBar } from "@/auth/AuthBar";
import  ConfirmationModal  from "../../shared/ConfirmationModal/ConfirmationModal";

import css from "./Sidebar.module.css";

type SidebarProps = {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
};

export default function Sidebar({
  isMobileMenuOpen,
  onCloseMobileMenu,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("token"));
    }
    return false;
  });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
    onCloseMobileMenu();
    router.push("/auth/login");
  };

  return (
    <>
      <div
        className={clsx(css.backdrop, isMobileMenuOpen && css.backdropVisible)}
        onClick={onCloseMobileMenu}
      />

      <aside
        className={clsx(css.sidebar, isMobileMenuOpen && css.sidebarMobileOpen)}
      >
        <div className={css.sidebarHeader}>
          <p className={css.sidebarTitle}>Menu</p>
          <button
            type="button"
            className={css.closeButton}
            onClick={onCloseMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Main navigation" className={css.nav}>
          <ul className={css.navList}>
            {navigationItems.map((item) => {
              const targetHref = isAuthenticated ? item.href : "/auth/login";
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={targetHref}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(css.navLink, isActive && css.activeLink)}
                    onClick={onCloseMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={css.sidebarFooter}>
          {isAuthenticated ? (
            <div className={css.authSection}>
              <UserBar />
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className={css.logoutBtn}
              >
                Вихід
              </button>
            </div>
          ) : (
            <AuthBar />
          )}
        </div>
      </aside>

      {isLogoutModalOpen && (
        <ConfirmationModal
    isOpen={isLogoutModalOpen}
    title="Ви впевнені, що хочете вийти?"
    confirmButtonText="Вийти"
    cancelButtonText="Скасувати"
    onConfirm={handleLogout}
    onCancel={() => setIsLogoutModalOpen(false)}
  />
      )}
    </>
  );
}
