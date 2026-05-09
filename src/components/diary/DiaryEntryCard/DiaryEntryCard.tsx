'use client';

import { useRouter } from 'next/navigation';
import styles from './DiaryEntryCard.module.css';

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

// Filters out MongoDB ObjectId strings that leak into emotions
const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DiaryEntryCard({ entry, onClick, isActive }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const isDesktop =
      typeof window !== 'undefined' && window.innerWidth >= 1024;
    if (isDesktop) {
      onClick(entry);
    } else {
      router.push(`/diary/${entry._id}`);
    }
  };
  console.log(entry.emotions);
  const safeEmotions = entry.emotions?.filter((e) => !OBJECT_ID_REGEX.test(e));

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{entry.title}</h3>
        <span className={styles.date}>{formatDate(entry.date)}</span>
      </div>
      <div className={styles.emotions}>
        {safeEmotions?.map((emotion, index) => (
          <span key={index} className={styles.tag}>
            {emotion}
          </span>
        ))}
      </div>
    </div>
  );
}
