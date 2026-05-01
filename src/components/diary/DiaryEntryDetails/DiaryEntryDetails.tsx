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
          <button
            type="button"
            className={styles.edit}
            onClick={() => onEdit(entry)}
            aria-label="Редагувати запис"
          >
            <Image src="/icons/edit.svg" alt="Редагувати" width={24} height={24} />
          </button>
        </div>
        <div className={styles.dateDiv}>
          <span>{entry.date}</span>
          <button
            type="button"
            className={styles.delete}
            onClick={() => setShowConfirm(true)}
            aria-label="Видалити запис"
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
          {entry.emotions?.map((emotion, index) => (
            <span key={index} className={styles.tag}>
              {emotion}
            </span>
          ))}
        </div>
      </div>

      {showConfirm && (
        <ConfirmationModal
          isOpen={showConfirm}
          title="Ви точно хочете видалити?"
          confirmButtonText="Так"
          cancelButtonText="Ні"
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