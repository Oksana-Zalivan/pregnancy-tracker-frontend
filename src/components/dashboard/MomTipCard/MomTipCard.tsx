import styles from "./MomTipCard.module.css";

type MomTipCardProps = {
  tip?: string | null;
};

export default function MomTipCard({ tip }: MomTipCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Порада для мами</h2>
      <p className={styles.text}>
        {tip ||
          "Не забувайте піклуватися про себе та відпочивати протягом дня."}
      </p>
    </section>
  );
}
