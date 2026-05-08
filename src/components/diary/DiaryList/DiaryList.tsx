"use client";

import DiaryEntryCard from "@/components/diary/DiaryEntryCard/DiaryEntryCard";
import styles from "./DiaryList.module.css";

// 1. ПОВЕРТАЄМО ТИПИ:
type DiaryEntry = {
  _id: string;
  title: string;
  date: string;
  description: string;
  emotions: string[];
};

type DiaryListProps = {
  entries: DiaryEntry[];
  selectedEntryId?: string;
  onSelectEntry: (entry: DiaryEntry) => void;
  onCreateEntry: () => void;
};

// 2. САМ КОМПОНЕНТ:
export default function DiaryList({
  entries,
  selectedEntryId,
  onSelectEntry,
  onCreateEntry,
}: DiaryListProps) {
  return (
    <section className={styles.diaryList}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваші записи</h2>

        <button
          type="button"
          className={styles.createButton}
          onClick={onCreateEntry}
        >
          Новий запис
          {/* Іконка плюсика як на макеті */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {entries.length === 0 ? (
        <p className={styles.placeholder}>Наразі записи у щоденнику відсутні</p>
      ) : (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <li key={entry._id} className={styles.item}>
              <DiaryEntryCard
                entry={entry}
                onClick={onSelectEntry}
                isActive={entry._id === selectedEntryId}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}