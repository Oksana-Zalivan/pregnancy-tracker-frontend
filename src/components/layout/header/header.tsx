"use client";

import Link from "next/link";
import css from "./Header.module.css";

type HeaderProps = {
    onOpenMenu: () => void;
};

export default function Header({ onOpenMenu }: HeaderProps) {
    return (
        <header className={css.header}>
            <div className={css.headerContainer}>
                <Link href="/" className={css.headerLogo}>
                    <svg className={css.headerLogo} width={84} height={36}>
                        <use href="/icons/logo.svg"></use>
                    </svg>
                </Link>

                <button
                    type="button"
                    aria-label="Open menu"
                    className={css.menuButton}
                    onClick={onOpenMenu}
                >
                    ☰
                </button>
            </div>
        </header>
    );
}
