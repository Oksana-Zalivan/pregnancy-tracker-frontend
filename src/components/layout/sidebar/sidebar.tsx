"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import toast from "react-hot-toast";

import { navigationItems } from "@/lib/constants/navigation";
import UserBar from "@/components/layout/UserBar/UserBar";
import AuthBar from "@/components/layout/AuthBar/AuthBar";
import ConfirmationModal from "@/shared/ConfirmationModal/ConfirmationModal";

import css from "./Sidebar.module.css";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

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

  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const isAuthenticated = Boolean(user);

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
        setIsCheckingAuth(false);
      }
    };

    getCurrentUser();
  }, []);

  
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

      setUser(null);
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

      <aside className={clsx(css.sidebar, isMobileMenuOpen && css.sidebarMobileOpen)}>
        <div className={css.sidebarHeader}>
          <p className={css.sidebarTitle}>Меню</p>
          <button 
            type="button" 
            className={css.closeButton} 
            onClick={onCloseMobileMenu}
            aria-label="Закрити меню" 
          >
            ✕
          </button>
        </div>

        <nav className={css.nav}>
          <ul className={css.navList}>
            {navigationItems.map((item) => {
              const targetHref = isAuthenticated ? item.href : "/auth/login";
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={targetHref}
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
          {isCheckingAuth ? null : isAuthenticated && user ? (
            <UserBar 
              user={user} 
              onLogout={() => setIsLogoutModalOpen(true)} 
            />
          ) : (
            <AuthBar onNavigate={onCloseMobileMenu} />
          )}
        </div>
      </aside>

      
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Ви впевнені, що хочете вийти?"
        confirmButtonText="Вийти"
        cancelButtonText="Скасувати"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}