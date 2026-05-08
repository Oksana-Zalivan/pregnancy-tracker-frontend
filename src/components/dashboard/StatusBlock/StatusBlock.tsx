'use client';

import { useCurrentWeekData } from '@/hooks/useCurrentWeekData';
import styles from './StatusBlock.module.css';

export default function StatusBlock() {
  const { data, isLoading } = useCurrentWeekData();

  if (isLoading) {
    return (
      <section className={styles.container}>
        <div className={styles.card}>
          <p className={styles.label}>Тиждень</p>
          <p className={styles.valuePlaceholder}>—</p>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Днів до зустрічі</p>
          <p className={styles.valuePlaceholder}>—</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>{data?.weekNumber ?? 1}</p>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>~{data?.daysUntilBirth ?? 280}</p>
      </div>
    </section>
  );
}
