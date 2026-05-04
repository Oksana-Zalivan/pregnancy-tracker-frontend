"use client";

import { useRouter } from "next/navigation";
import styles from "./DiaryEntryCard.module.css";

type Entry = {
  _id: string;
  title: string;
  date: string;
  description: string;
  emotions: string[];
};

type Props = {
  entry: Entry;
  onClick: (entry: Entry) => void;
  isActive?: boolean;
};

export default function DiaryEntryCard({ entry, onClick, isActive }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const isDesktop =
      typeof window !== "undefined" && window.innerWidth >= 1440;
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
        {entry.emotions?.map((emotion, index) => (
          <span key={index} className={styles.tag}>
            {emotion}
          </span>
        ))}
      </div>
    </div>
  );
}
