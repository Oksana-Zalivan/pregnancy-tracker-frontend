"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navigationItems } from "@/lib/constants/navigation";
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

  const isAuthenticated = false;

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
      </aside>
    </>
  );
}
