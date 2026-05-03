import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/dashboard/StatuBlock/StatusBlock";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
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
