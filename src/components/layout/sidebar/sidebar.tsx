'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import { navigationItems } from '@/lib/constants/navigation';
import { useAuthStore } from '@/store/authStore';
import UserBar from '@/components/layout/UserBar/UserBar';
import AuthBar from '@/components/layout/AuthBar/AuthBar';
import ConfirmationModal from '@/components/shared/ConfirmationModal/ConfirmationModal';

import css from './Sidebar.module.css';

const iconMap: Record<string, string> = {
  '/': 'my-day',
  '/journey/1': 'journey',
  '/diary': 'diary',
  '/profile': 'profile',
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

  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const clearUser = useAuthStore((state) => state.clearUser);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const isAuthenticated = Boolean(user);

  const handleLogout = async () => {
    try {
      setIsLogoutLoading(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Не вдалося вийти з акаунту');

      clearUser();
      setIsLogoutModalOpen(false);
      onCloseMobileMenu();
      router.push('/');
      router.refresh();
    } catch {
      toast.error('Не вдалося вийти з акаунту');
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
        <div className={css.sidebarHeaderTop}>
          <Link href="/" className={css.logoLink} onClick={onCloseMobileMenu}>
            <svg width="105" height="45">
              <use href="/images/sprite.svg#icon-logo" />
            </svg>
          </Link>

          <button
            type="button"
            className={css.closeButton}
            onClick={onCloseMobileMenu}
            aria-label="Закрити меню"
          >
            <svg width="24" height="24" className={css.closeIcon}>
              <use href="/images/sprite.svg#icon-close" />
            </svg>
          </button>
        </div>

        {/* ЗАГОЛОВОК МЕНЮ */}
        <div className={css.sidebarHeader}></div>

        <nav aria-label="Main navigation" className={css.nav}>
          <ul className={css.navList}>
            {navigationItems.map((item) => {
              const targetHref = isAuthenticated ? item.href : '/auth/login';
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              const iconName = iconMap[item.href] || 'activity';

              return (
                <li key={item.label}>
                  <Link
                    href={targetHref}
                    className={clsx(css.navLink, isActive && css.activeLink)}
                    onClick={onCloseMobileMenu}
                  >
                    <svg className={css.navIcon} width="24" height="24">
                      <use href={`/images/sprite.svg#icon-${iconName}`} />
                    </svg>
                    <span>{item.label}</span>
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
        confirmButtonText={isLogoutLoading ? 'Вихід...' : 'Вийти'}
        cancelButtonText="Скасувати"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
