import styles from "./JourneyDetails.module.css";
import { MomData } from "@/types/journey";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";

type Props = {
  data: MomData;
};

export const MomTab = ({ data }: Props) => {
  return (
    <div className={styles.momGrid}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.card}>
          <h3>Як ви можете почуватись</h3>

          <ul>
            {data.feelings.states.map((state, i) => (
              <li key={i} className={styles.list}>{state}</li>
            ))}
          </ul>
          <p className={styles.txt}>{data.feelings.sensationDescr}</p>

        </div>

        <div className={styles.card}>
          <h3>Поради для вашого комфорту</h3>

          <ul>
            {data.comfortTips.map((tip, i) => (
              <li key={i}>
                <strong>{tip.category}:</strong> {tip.tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <TasksReminderCard />
      </div>
    </div>
  );
};
