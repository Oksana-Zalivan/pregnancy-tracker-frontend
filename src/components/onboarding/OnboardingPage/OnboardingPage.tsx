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
      <section className={styles.onboardingSection}>
        <div className={styles.onboardingContainer}>
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
          />
        </div>
      )}
    </main>
  );
}
