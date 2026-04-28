"use client";

import React, { useState } from "react";
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

export const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          className={styles.fixedMobileBtn}
          onClick={() => setIsOpen(true)}
        >
          <Image src="/icons/menu.svg" alt="open menu" width={24} height={24} />
        </button>
      )}

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <Image
              src="/icons/logo.svg"
              alt="Лелека"
              width={100}
              height={45}
              priority
            />
          </div>

          <button className={styles.burgerBtn} onClick={() => setIsOpen(false)}>
            <Image
              src="/icons/close.svg"
              alt="close menu"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Навігація */}
        <nav className={styles.nav}>
          <MenuItem
            label="Мій день"
            href="/dashboard"
            iconName="my-day"
            active={pathname === "/dashboard"}
          />
          <MenuItem
            label="Подорож"
            href="/journey"
            iconName="journey"
            active={pathname === "/journey"}
          />
          <MenuItem
            label="Щоденник"
            href="/diary"
            iconName="diary"
            active={pathname === "/diary"}
          />
          <MenuItem
            label="Профіль"
            href="/profile"
            iconName="profile"
            active={pathname === "/profile"}
          />
        </nav>
      </aside>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};
