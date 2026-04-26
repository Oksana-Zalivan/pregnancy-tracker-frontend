"use client";

import React, { useState } from "react";
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
  return (
    <Link
      href={href}
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
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={isOpen ? "/icons/close.svg" : "/icons/menu.svg"}
          alt="menu toggle"
          width={24}
          height={24}
        />
      </button>

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.logoContainer}>
          <Image
            src="/icons/logo.svg"
            alt="Лелека"
            width={120}
            height={40}
            priority
          />
        </div>

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
    </>
  );
};
