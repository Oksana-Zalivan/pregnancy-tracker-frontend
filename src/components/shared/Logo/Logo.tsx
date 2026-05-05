import Image from 'next/image';
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
      <Image
        src="/icons/logo.svg"
        alt="Leleka"
        fill
        className={styles.image}
        priority
      />
    </div>
  );

  if (withLink) {
    return <Link href="/">{logo}</Link>;
  }

  return logo;
}
