'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  
  if (pathname.startsWith('/auth')) return null;

  

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
      <Link href="/" className={styles.link}>Мій день</Link>
      
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const title = translations[segment] || segment;

        return (
          <React.Fragment key={href}>
            <span className={styles.separator}>/</span>
            {isLast ? (
              <span className={styles.current}>{title}</span>
            ) : (
              <Link href={href} className={styles.link}>{title}</Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </nav>
  );
};