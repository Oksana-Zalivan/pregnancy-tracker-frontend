import styles from "./MomTipCard.module.css";

interface MomTipCardProps {
  tip: string | null;
}

export default function MomTipCard({ tip }: MomTipCardProps) {
  if (!tip) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Порада для мами</h3>
      <p className={styles.text}>{tip}</p>
    </div>
  );
}
