"use client";

import DiaryEntryCard from "@/components/diary/DiaryEntryCard/DiaryEntryCard";
import styles from "./DiaryList.module.css";

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

export default function DiaryList({
  entries,
  selectedEntryId,
  onSelectEntry,
  onCreateEntry,
}: DiaryListProps) {
  return (
    <section className={styles.diaryList}>
      <div className={styles.header}>
        <h1 className={styles.title}>Щоденник</h1>

        <button
          type="button"
          className={styles.createButton}
          onClick={onCreateEntry}
        >
          Новий запис
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
