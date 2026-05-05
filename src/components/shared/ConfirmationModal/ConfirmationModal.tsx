"use client";

import Modal from "@/components/shared/Modal/Modal";
import Button from "@/components/shared/Button/Button";
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
  return (
    <Modal isOpen={isOpen} onClose={onCancel} className={styles.modal}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.buttons}>
        <Button className={styles.cancelButton} onClick={onCancel}>
          {cancelButtonText}
        </Button>

        <Button className={styles.confirmButton} onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
}