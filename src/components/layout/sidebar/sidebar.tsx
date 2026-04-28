"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/constants/navigation";
import { useCurrentUserProfile } from "@/hooks/useCurrentUserProfile";
import css from "@/components/layout/sidebar/sidebar.module.css";
import clsx from "clsx";

type SidebarProps = {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
};

export default function Sidebar({
  isMobileMenuOpen,
  onCloseMobileMenu,
}: SidebarProps) {
  const pathname = usePathname();
  const { profile } = useCurrentUserProfile();
  const isAuthenticated =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

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
          >
            ✕
          </button>
        </div>

        <nav aria-label="Main navigation">
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

        <div className={css.profileCard}>
          <Image
            src={profile.avatarUrl}
            alt={`Аватар користувача ${profile.name}`}
            width={56}
            height={56}
            className={css.profileAvatar}
            unoptimized
          />

          <div className={css.profileMeta}>
            <p className={css.profileName}>{profile.name}</p>
            <p className={css.profileEmail}>{profile.email}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
