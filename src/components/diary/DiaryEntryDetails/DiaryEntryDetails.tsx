'use client';

import { useState } from 'react';
import styles from './DiaryEntryDetails.module.css';
import ConfirmationModal from '@/components/shared/ConfirmationModal/ConfirmationModal';

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

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!entry) {
    return (
      <div className={styles.details}>
        <p className={styles.empty}>Оберіть запис, щоб переглянути деталі</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.details}>
        {/* Обгорнули заголовок і дату в один спільний рядок */}
        <div className={styles.topRow}>
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>{entry.title}</h2>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => onEdit(entry)}
              aria-label="Редагувати запис"
            >
              <svg className={styles.icon} width="24" height="24">
                <use href="/images/sprite.svg#icon-edit" />
              </svg>
            </button>
          </div>

          <div className={styles.dateGroup}>
            <span className={styles.date}>{formatDate(entry.date)}</span>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setShowConfirm(true)}
              aria-label="Видалити запис"
            >
              <svg className={styles.icon} width="24" height="24">
                <use href="/images/sprite.svg#icon-trash" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.description}>
          {entry.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.emotions}>
          {entry.emotions
            ?.filter((e) => !OBJECT_ID_REGEX.test(e))
            .map((emotion, index) => (
              <span key={index} className={styles.tag}>
                {emotion}
              </span>
            ))}
        </div>
      </div>

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
