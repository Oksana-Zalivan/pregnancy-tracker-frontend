import styles from './JourneyDetails.module.css';

type MomData = {
  feelings: string;
  tips: string[];
};

type Props = {
  data: MomData;
};

export const MomTab = ({ data }: Props) => {
  return (
    <div className={styles.momGrid}>
      <div className={styles.left}>
        <div className={styles.card}>
          <h3>Як ви можете почуватись</h3>
          <p>{data.feelings}</p>
        </div>

        <div className={styles.card}>
          <h3>Поради для вашого комфорту</h3>
          <ul>
            {data.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.right}>
        <h3>Важливі завдання</h3>
      </div>
    </div>
  );
};