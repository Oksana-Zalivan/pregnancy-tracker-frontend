import Image from "next/image";
import styles from "./ConfirmationModal.module.css";

type Props = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onCancel}>
          <Image src="/icons/close.svg" alt="Закрити" width={24} height={24} />
        </button>
        <h2>{title}</h2>
        <div className={styles.options}>
          <button type="button" className={styles.option} onClick={onCancel}>
            {cancelButtonText}
          </button>
          <button type="button" className={`${styles.option} ${styles.tak}`} onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}