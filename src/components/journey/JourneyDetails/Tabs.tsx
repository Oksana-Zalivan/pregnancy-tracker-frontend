import styles from './JourneyDetails.module.css';
type Tab = "baby" | "mom";

export const Tabs = ({ active, onChange }: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) => {
  return (
    <div className={styles.tabs}>
      <button
        className={active === "baby" ? styles.active : ""}
        onClick={() => onChange("baby")}
      >
        Розвиток малюка
      </button>

      <button
        className={active === "mom" ? styles.active : ""}
        onClick={() => onChange("mom")}
      >
        Тіло мами
      </button>
    </div>
  );
};