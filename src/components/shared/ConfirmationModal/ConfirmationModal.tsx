"use client";

import { useEffect } from "react";
import styles from "./ConfirmationModal.module.css";

type Props = {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            {cancelButtonText}
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}