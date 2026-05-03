import styles from "./TasksReminderCard.module.css";

export default function TasksReminderCard() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваші завдання</h2>
        <button type="button" className={styles.addButton}>
          +
        </button>
      </div>

      <ul className={styles.list}>
        <li className={styles.item}>Записатися до лікаря</li>
        <li className={styles.item}>Купити вітаміни</li>
      </ul>

      <button type="button" className={styles.createButton}>
        Створити завдання
      </button>
    </section>
  );
}
