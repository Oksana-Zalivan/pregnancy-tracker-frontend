'use client';

import Image from 'next/image';
import { useCurrentWeekData } from '@/hooks/useCurrentWeekData';
import styles from './BabyTodayCard.module.css';

export default function BabyTodayCard() {
  const { baby, isLoading } = useCurrentWeekData();

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Малюк сьогодні</h2>

      {isLoading ? (
        <p className={styles.text}>Завантажуємо дані...</p>
      ) : (
        <>
          <div className={styles.top}>
            {baby?.image && (
              <Image
                src={baby.image}
                alt={baby.analogy || 'Малюк'}
                width={140}
                height={140}
                className={styles.image}
                unoptimized
              />
            )}

            <div className={styles.textBlock}>
              <p className={styles.size}>
                <span className={styles.textBlockMain}>Розмір:</span>{' '}
                {baby?.size ?? '...'} см
              </p>

              <p className={styles.text}>
                <span className={styles.textBlockMain}>Вага:</span>{' '}
                {baby?.weight ?? '...'} г
              </p>

              <p className={styles.activity}>
                <span className={styles.textBlockMain}>Активність:</span>{' '}
                {baby?.activity || 'Дані поки відсутні'}
              </p>
            </div>
          </div>

          <p className={styles.description}>
            {baby?.development || 'Дані про розвиток малюка поки відсутні.'}
          </p>
        </>
      )}
    </section>
  );
}
