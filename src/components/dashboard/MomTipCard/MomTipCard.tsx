import styles from "./MomTipCard.module.css";

export default function MomTipCard() {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Порада для мами</h2>

      <p className={styles.text}>
        Не забувайте про зволоження шкіри живота та стегон спеціальними
        олійками, щоб попередити появу розтяжок.
      </p>
    </section>
  );
}
