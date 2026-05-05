"use client";
import Link from "next/link";
import css from "./AuthBar.module.css";

type AuthBarProps = {
  onNavigate?: () => void;
};

export default function AuthBar({ onNavigate }: AuthBarProps) {
    return (
        <div className={css.authBarMenu}>
            
        <div className={css.divider} />
            <Link href="/auth/register" className={css.authBarButtonPink} onClick={onNavigate}>
                Зареєструватися
            </Link>
            <Link href="/auth/login" className={css.authBarButtonGray} onClick={onNavigate}>
                Увійти
            </Link >
        </div>
  );
}