import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      {/* Верх */}
      <div className={styles.topRow}>
        <div className={styles.greetingBlock}>GreetingBlock</div>
        <div className={styles.statusBlock}>StatusBlock</div>
      </div>

      {/* Нижня частина */}
      <div className={styles.content}>
        {/* Ліва колонка */}
        <div className={styles.leftColumn}>
          <div className={styles.babyTodayCard}>BabyTodayCard</div>
          <div className={styles.momTipCard}>MomTipCard</div>
        </div>

        {/* Права колонка */}
        <div className={styles.rightColumn}>
          <div className={styles.tasksReminderCard}>TasksReminderCard</div>
          <div className={styles.feelingCheckCard}>FeelingCheckCard</div>
        </div>
      </div>
    </main>
  );
}
