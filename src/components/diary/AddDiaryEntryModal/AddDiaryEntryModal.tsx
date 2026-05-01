"use client";

import { useEffect } from "react";
import styles from "./AddDiaryEntryModal.module.css";

export default function AddDiaryEntryModal({ onClose, children }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}