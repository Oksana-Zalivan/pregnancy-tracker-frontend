"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./SideBar.module.css";

interface MenuItemProps {
  label: string;
  href: string;
  iconName: string;
  active: boolean;
}

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuItem = ({ label, href, iconName, active }: MenuItemProps) => {
  const router = useRouter();
  const isAuthorized = true;

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthorized) {
      e.preventDefault();
      router.push("/auth/login");
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${styles.menuItem} ${active ? styles.activeItem : ""}`}
    >
      <div className={styles.iconWrapper}>
        <Image
          src={`/icons/${iconName}.svg`}
          alt={label}
          width={24}
          height={24}
        />
      </div>
      {label}
    </Link>
  );
};

export const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  const pathname = usePathname();
  const isAuthenticated =
    typeof window !== "undefined"
      ? Boolean(localStorage.getItem("token"))
      : false;
  const getHref = (privateHref: string) =>
    isAuthenticated ? privateHref : "/auth/login";
  const currentWeek = 1;

  return (
    <>
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.header}>
          <Link href="/" className={styles.logoContainer}>
            <Image
              src="/icons/logo.svg"
              alt="Лелека"
              width={100}
              height={45}
              priority
            />
          </Link>

          <button className={styles.burgerBtn} onClick={onClose}>
            <Image
              src="/icons/close.svg"
              alt="close menu"
              width={18}
              height={18}
            />
          </button>
        </div>

        <nav className={styles.nav}>
          <MenuItem
            label="Мій день"
            href={getHref("/")}
            iconName="my-day"
            active={pathname === "/"}
          />
          <MenuItem
            label="Подорож"
            href={getHref(`/journey/${currentWeek}`)}
            iconName="journey"
            active={pathname.startsWith("/journey")}
          />
          <MenuItem
            label="Щоденник"
            href={getHref("/diary")}
            iconName="diary"
            active={pathname === "/diary"}
          />
          <MenuItem
            label="Профіль"
            href={getHref("/profile")}
            iconName="profile"
            active={pathname === "/profile"}
          />
        </nav>
      </aside>

      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </>
  );
};
