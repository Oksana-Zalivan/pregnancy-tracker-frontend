'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  
  if (pathname === '/' || pathname.startsWith('/auth')) return null;

  const pathSegments = pathname.split('/').filter(item => item !== '');
  const translations: { [key: string]: string } = {
    dashboard: 'Мій день',
    journey: 'Подорож',
    diary: 'Щоденник',
    profile: 'Профіль',
  };

  return (
    <nav className={styles.container}>
      <div className={styles.flexRow}>
        
        <Link href="/dashboard" className={styles.link}>
          Лелека
        </Link>

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const label = translations[segment] || segment;

          return (
            <div key={segment} className={styles.flexRow}>
              <span className={styles.separator}>&gt;</span>
              <span className={isLast ? styles.current : styles.link}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};