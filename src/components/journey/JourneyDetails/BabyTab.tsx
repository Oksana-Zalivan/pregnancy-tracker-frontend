import Image from "next/image";
import { BabyData } from "@/types/journey";
import styles from './JourneyDetails.module.css';

type Props = {
  data: BabyData;
};

export const BabyTab = ({ data }: Props) => {
  return (
    <div className={styles.babyGrid}>
      
      {/* Ліва частина: Картка з фруктом/овочем */}
      <div className={styles.imageCard}>
  <div className={styles.imgContainer}>
    {/* Контейнер, який створює рамку та фон */}
    <div className={styles.imgFrame}>
      <Image
        src={data.image}
        alt="baby analogy"
        fill
        className={styles.babyImage}
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
  </div>
  
  <p className={styles.sizeText}>
    Ваш малюк зараз розміром з <strong>{data.analogy}</strong>
  </p>
</div>

      {/* Права частина: Опис розвитку та факт */}
      <div className={styles.textCard}>
        <div className={styles.developmentText}>
          {/* Якщо дані приходять як один текст, можна розбити на параграфи через split або просто вивести */}
          <p>{data.babyDevelopment}</p>
        </div>

        {/* Блок з цікавим фактом */}
        <div className={styles.highlight}>
          <div className={styles.factHeader}>
             <svg width={20} height={20} className={styles.factIcon}>
                <use href="/images/sprite.svg#icon-star" /> {/* Перевір назву іконки в спрайті */}
             </svg>
             <span>Цікавий факт тижня</span>
          </div>
          <p className={styles.factText}>{data.interestingFact}</p>
        </div>
      </div>

    </div>
  );
};