"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./DiaryEntryDetails.module.css";
import ConfirmationModal from "@/components/shared/ConfirmationModal/ConfirmationModal";

type Entry = {
  _id: string;
  title: string;
  date: string;
  description: string;
  emotions: string[];
};

type Props = {
  entry: Entry | null;
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
};

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  // Стан, коли жодного запису не обрано (або список порожній)
  if (!entry) {
    return (
      <div className={styles.details}>
        <p className={styles.emptyText}>Наразі записи у щоденнику відсутні</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.details}>
        
        {/* ШАПКА: Заголовок+Редагувати (зліва) та Дата+Видалити (справа) */}
        <div className={styles.topRow}>
          
          <div className={styles.titleGroup}>
            <h2>{entry.title}</h2>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => onEdit(entry)}
              aria-label="Редагувати запис"
            >
              <Image src="/icons/edit.svg" alt="Редагувати" width={24} height={24} />
            </button>
          </div>

          <div className={styles.dateGroup}>
            <span>{entry.date}</span>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setShowConfirm(true)}
              aria-label="Видалити запис"
            >
              <Image src="/icons/sicon-trash" alt="Видалити" width={24} height={24} />
            </button>
          </div>

        </div>

        {/* ОСНОВНИЙ ТЕКСТ (з підтримкою абзаців) */}
        <div className={styles.pDiv}>
          {entry.description.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* ТЕГИ ЕМОЦІЙ (бульбашки знизу) */}
        {entry.emotions && entry.emotions.length > 0 && (
          <div className={styles.emotions}>
            {entry.emotions.map((emotion, index) => (
              <span key={`${entry._id}-emotion-${index}`} className={styles.tag}>
                {emotion}
              </span>
            ))}
          </div>
        )}
        
      </div>

      {/* МОДАЛКА ПІДТВЕРДЖЕННЯ ВИДАЛЕННЯ */}
      {showConfirm && (
        <ConfirmationModal
          isOpen={showConfirm}
          title="Ви точно хочете видалити цей запис?"
          confirmButtonText="Так, видалити"
          cancelButtonText="Ні, залишити"
          onConfirm={() => {
            onDelete(entry._id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}