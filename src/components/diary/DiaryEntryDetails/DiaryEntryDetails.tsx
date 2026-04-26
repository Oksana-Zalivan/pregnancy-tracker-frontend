"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./DiaryEntryDetails.module.css";

type Emotion = {
  _id: string;
  title: string;
};

type Entry = {
  _id: string;
  title: string;
  date: string;
  description: string;
  emotions: Emotion[];
};

type Props = {
  entry: Entry | null;
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
};

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!entry) {
    return (
      <div className={styles.details}>
        <p>Наразі записи у щоденнику відсутні</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!confirm("Видалити цей запис?")) return;
    setIsDeleting(true);
    try {
      await onDelete(entry._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.details}>
      <div className={styles.detailsHeader}>
        <h2>{entry.title}</h2>
        <button className={styles.edit} onClick={() => onEdit(entry)}>
          <Image src="/icons/edit.svg" alt="edit" width={24} height={24} />
        </button>
      </div>
      <div className={styles.dateDiv}>
        <span>{entry.date}</span>
        <button
          className={styles.delete}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Image src="/icons/trash.svg" alt="delete" width={24} height={24} />
        </button>
      </div>
      <div className={styles.pDiv}>
        {entry.description.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
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