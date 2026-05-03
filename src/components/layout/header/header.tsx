"use client";

import Link from "next/link";
import css from "./Header.module.css";

type HeaderProps = {
  onOpenMenu: () => void;
};

export default function Header({ onOpenMenu }: HeaderProps) {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        Pregnancy Tracker
      </Link>

      <button
        type="button"
        aria-label="Open menu"
        className={css.menuButton}
        onClick={onOpenMenu}
      >
        ☰
      </button>
    </header>
  );
}
