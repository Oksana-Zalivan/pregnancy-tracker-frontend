import styles from "./JourneyDetails.module.css";
import { MomData } from "@/types/journey";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";

type Props = {
  data: MomData;
};
const getIconId = (category: string) => {
  const iconMap: Record<string, string> = {
    "Харчування": "icon-food",   // Замініть на реальні ID з вашого sprite.svg
    "Активність": "icon-activity",
    "Відпочинок": "icon-rest"
  };
  return iconMap[category] || "icon-default";
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
<ul className={styles.tipsList}>
            {data.comfortTips.map((tip, i) => (
              <li key={i} className={styles.tipItem}>
                
                {/* Обгортка для іконки та назви категорії */}
                <div className={styles.tipHeader}>
                  <svg className={styles.icon} width={18} height={20}>
                    {/* Використовуємо динамічний ID і правильний шлях */}
                    <use href={`/images/sprite.svg#${getIconId(tip.category)}`}></use>
                  </svg>
                  <span className={styles.categoryName}>{tip.category}</span>
                </div>

                {/* Сам текст поради йде окремо знизу */}
                <p className={styles.tipText}>{tip.tip}</p>

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
