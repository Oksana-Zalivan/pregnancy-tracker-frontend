'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';

import Logo from '@/components/shared/Logo/Logo';

import styles from './AuthPage.module.css';

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
  imageAlt = '',
}: AuthPageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.authPanel}>
        <div className={styles.authContainer}>
          <div className={styles.logoWrapper}>
            <Logo size="small" />
          </div>

          <div className={styles.formWrapper}>
            <h1 className={styles.title}>{title}</h1>
            {children}
          </div>
        </div>
      </section>

      {imageSrc && (
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="50vw"
          />
        </div>
      )}
    </main>
  );
}
