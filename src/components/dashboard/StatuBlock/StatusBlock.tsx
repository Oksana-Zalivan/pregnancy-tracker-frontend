import styles from "./StatusBlock.module.css";

export default function StatusBlock() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>16</p>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>~165</p>
      </div>
    </div>
  );
}
