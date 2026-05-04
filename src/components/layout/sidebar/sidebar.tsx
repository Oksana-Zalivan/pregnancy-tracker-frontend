"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import toast from "react-hot-toast";
import { navigationItems } from "@/lib/constants/navigation";
import css from "./sidebar.module.css";

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

  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const clearUser = useAuthStore((state) => state.clearUser);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const isAuthenticated = Boolean(user);

  const handleLogout = async () => {
    try {
      setIsLogoutLoading(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Не вдалося вийти з акаунту");
      }

      clearUser();
      setIsLogoutModalOpen(false);
      onCloseMobileMenu();
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Не вдалося вийти з акаунту");
    } finally {
      setIsLogoutLoading(false);
    }
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
          <p className={css.sidebarTitle}>Меню</p>

          <button
            type="button"
            className={css.closeButton}
            onClick={onCloseMobileMenu}
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
          {isAuthLoading ? null : isAuthenticated && user ? (
            <UserBar user={user} onLogout={() => setIsLogoutModalOpen(true)} />
          ) : (
            <AuthBar onNavigate={onCloseMobileMenu} />
          )}
        </div>
      </aside>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Ви впевнені, що хочете вийти?"
        confirmButtonText={isLogoutLoading ? "Вихід..." : "Вийти"}
        cancelButtonText="Скасувати"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
