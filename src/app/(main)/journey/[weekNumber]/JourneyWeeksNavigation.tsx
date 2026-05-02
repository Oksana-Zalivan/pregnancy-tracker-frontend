"use client";

import Link from "next/link";
import styles from "./JourneyPage.module.css";

interface Props {
  currentWeek: number;
}

export default function JourneyWeeksNavigation({ currentWeek }: Props) {
  // Генеруємо масив від 1 до 40 тижнів
  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className={styles.weeksScroll}>
      {weeks.map((week) => (
        <Link
          key={week}
          href={`/journey/${week}`}
          className={`${styles.weekItem} ${currentWeek === week ? styles.activeWeek : ""}`}
        >
          <span className={styles.weekNumber}>{week}</span>
          <span className={styles.weekText}>Тиждень</span>
        </Link>
      ))}
    </div>
  );
}