"use client";

import { useRouter } from "next/navigation";
import styles from "./DiaryEntryCard.module.css";

type Emotion = {
  _id: string;
  title: string;
};

type Entry = {
  _id: string;
  title: string;
  date: string;
  emotions: Emotion[];
};

type Props = {
  entry: Entry;
  onClick: (entry: Entry) => void;
  isActive?: boolean;
};

export default function DiaryEntryCard({ entry, onClick, isActive }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const isDesktop = window.innerWidth >= 1440;
    if (isDesktop) {
      onClick(entry);
    } else {
      router.push(`/diary/${entry._id}`);
    }
  };

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div className={styles.cardHeader}>
        <h3>{entry.title}</h3>
        <span className={styles.date}>{entry.date}</span>
      </div>
      <div className={styles.emotions}>
        {entry.emotions?.map((emotion: Emotion) => (
          <span key={emotion._id} className={styles.tag}>
            {emotion.title}
          </span>
        ))}
      </div>
    </div>
  );
}