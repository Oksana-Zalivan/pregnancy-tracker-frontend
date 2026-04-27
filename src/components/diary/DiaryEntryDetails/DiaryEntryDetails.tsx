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
  const [showConfirm, setShowConfirm] = useState(false);

  if (!entry) {
    return (
      <div className={styles.details}>
        <p>Наразі записи у щоденнику відсутні</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.details}>
        <div className={styles.detailsHeader}>
          <h2>{entry.title}</h2>
          <button type="button" className={styles.edit} onClick={() => onEdit(entry)}>
            <Image src="/icons/edit.svg" alt="Редагувати" width={24} height={24} />
          </button>
        </div>
        <div className={styles.dateDiv}>
          <span>{entry.date}</span>
          <button
            type="button"
            className={styles.delete}
            onClick={() => setShowConfirm(true)}
          >
            <Image src="/icons/trash.svg" alt="Видалити" width={24} height={24} />
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

      {showConfirm && (
        <div className={styles.backdrop} onClick={() => setShowConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalTitle}>Ви впевнені, що хочете видалити цей запис?</p>
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowConfirm(false)}
              >
                Ні
              </button>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={() => {
                  onDelete(entry._id);
                  setShowConfirm(false);
                }}
              >
                Так
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}