import Link from 'next/link';
import clsx from 'clsx';
import styles from './Logo.module.css';

type LogoProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  withLink?: boolean;
};

export default function Logo({
  className,
  size = 'medium',
  withLink = true,
}: LogoProps) {
  const logo = (
    <div className={clsx(styles.logo, styles[size], className)}>
      <svg className={styles.icon} aria-label="Leleka">
        <use href="/images/sprite.svg#icon-logo" />
      </svg>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" aria-label="Перейти на головну сторінку">
        {logo}
      </Link>
    );
  }

  return logo;
}
