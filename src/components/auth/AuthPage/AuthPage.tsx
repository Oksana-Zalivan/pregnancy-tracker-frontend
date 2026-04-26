"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./AuthPage.module.css";

type AuthPageProps = {
  title: string;
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
};

export default function AuthPage({
  title,
  children,
  imageSrc,
  imageAlt = "",
}: AuthPageProps) {
  return (
    <main className={styles.page}>
      {/* Ліва частина */}
      <section className={styles.authPanel}>
        {/* Лого */}
        <div className={styles.logo}>
          <Image
            src="/icons/logo.svg"
            alt="Лелека"
            width={75}
            height={32}
            priority
            unoptimized
          />
        </div>

        {/* Контент */}
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </section>

      {/* Права частина (тільки якщо є картинка) */}
      {imageSrc && (
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={imageSrc}
            alt={imageAlt}
            width={720}
            height={900}
            priority
          />
        </div>
      )}
    </main>
  );
}
