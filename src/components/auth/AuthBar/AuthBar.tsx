"use client";
import Link from "next/link";
import css from "./AuthBar.module.css";


export default function AuthBar() {
    return (
        <div className={css.authBarMenu}>
            
        <div className="divider" />
            <Link href="/auth/register" className={css.authBarButtonPink}>
                Зареєструватися
            </Link>
            <Link href="/auth/login" className={css.authBarButtonGray}>
                Увійти
            </Link >
        </div>
  );
}