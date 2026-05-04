"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import styles from "./AddDiaryEntryModal.module.css";

type AddDiaryEntryModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export default function AddDiaryEntryModal({
  onClose,
  children,
}: AddDiaryEntryModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Закрити модальне вікно"
          className={styles.close}
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}