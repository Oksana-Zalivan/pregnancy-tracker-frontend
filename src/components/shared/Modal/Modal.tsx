"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  backdropClassName?: string;
  showCloseButton?: boolean;
};

export default function Modal({
  isOpen,
  children,
  onClose,
  className,
  backdropClassName,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={clsx(styles.backdrop, backdropClassName)}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={clsx(styles.modal, className)}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {showCloseButton && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрити модальне вікно"
          >
            ×
          </button>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
}
