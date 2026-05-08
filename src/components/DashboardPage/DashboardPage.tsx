import PageHeader from '@/components/shared/PageHeader/PageHeader';
import StatusBlock from '@/components/dashboard/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/dashboard/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/dashboard/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/dashboard/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/dashboard/FeelingCheckCard/FeelingCheckCard';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <PageHeader />

      <div className={styles.content}>
        <div className={styles.mainColumn}>
          <div className={styles.statusRow}>
            <StatusBlock />
          </div>

          <div className={styles.babyTodayCard}>
            <BabyTodayCard />
          </div>

          <div className={styles.momTipCard}>
            <MomTipCard />
          </div>
        </div>

        <div className={styles.sideColumn}>
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
