import styles from "./FeelingCheckCard.module.css";

export default function FeelingCheckCard() {
  return (
    <section className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>Як ви себе почуваєте?</h2>

        <p className={styles.text}>
          Рекомендація на сьогодні: занотуйте незвичні відчуття у тілі.
        </p>
      </div>

      <button type="button" className={styles.button}>
        Зробити запис у щоденник
      </button>
    </section>
  );
}
