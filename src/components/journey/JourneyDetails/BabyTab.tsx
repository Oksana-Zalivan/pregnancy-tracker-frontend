import Image from "next/image";
import { BabyData } from "@/types/journey";
import styles from './JourneyDetails.module.css';

type Props = {
  data: BabyData;
};

export const BabyTab = ({ data }: Props) => {
  return (
    <div className={styles.babyGrid}>
      <div className={styles.leftColumn}>
        <div className={styles.imgFrame}>
          <Image
            src={data.image}
            alt="baby analogy"
            fill
            className={styles.babyImage}
            sizes="(max-width: 1024px) 100vw, 350px"
            priority
          />
        </div>
        <p className={styles.sizeText}>
          Ваш малюк зараз розміром з {data.analogy}
        </p>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.developmentText}>
          <p>{data.babyDevelopment}</p>
        </div>
        <div className={styles.highlight}>
          <div className={styles.factHeader}>
             <svg width={20} height={20} className={styles.factIcon}>
                <use href="/images/sprite.svg#icon-star" />
             </svg>
             <span>Цікавий факт тижня</span>
          </div>
          <p className={styles.factText}>{data.interestingFact}</p>
        </div>
      </div>
    </div>
  );
};