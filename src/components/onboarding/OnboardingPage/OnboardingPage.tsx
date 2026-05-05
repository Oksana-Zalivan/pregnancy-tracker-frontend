'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './OnboardingPage.module.css';

type OnboardingPageProps = {
  title: string;
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
};

export default function OnboardingPage({
  title,
  children,
  imageSrc,
  imageAlt = 'Page Image',
}: OnboardingPageProps) {
  return (
    <main className={styles.page}>
      {/* Ліва частина */}
      <section className={styles.onboardingSection}>
        {/* Логотип */}
        <div className={styles.logo}>
          <Image
            src="/icons/logo.svg"
            alt="Лелека-логотип"
            width={75}
            height={32}
            priority
          />
        </div>
        {/* Контент */}
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </section>
      {/* Зображення правої частини сторінки */}
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
