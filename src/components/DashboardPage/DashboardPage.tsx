import GreetingBlock from "@/components/dashboard/greeting-block/GreetingBlock";
import StatusBlock from "@/components/dashboard/status-block/StatusBlock";
import BabyTodayCard from "@/components/dashboard/baby-today-card/BabyTodayCard";
import MomTipCard from "@/components/dashboard/mom-tip-card/MomTipCard";
import TasksReminderCard from "@/components/dashboard/tasks-reminder-card/TasksReminderCard";
import FeelingCheckCard from "@/components/dashboard/feeling-check-card/FeelingCheckCard";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <div className={styles.topRow}>
        <div className={styles.greetingBlock}>
          <GreetingBlock />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.statusBlock}>
            <StatusBlock />
          </div>

          <div className={styles.babyTodayCard}>
            <BabyTodayCard />
          </div>

          <div className={styles.momTipCard}>
            <MomTipCard />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.tasksReminderCard}>
            <TasksReminderCard />
          </div>

          <div className={styles.feelingCheckCard}>
            <FeelingCheckCard />
          </div>
        </div>
      </div>
    </main>
  );
}
