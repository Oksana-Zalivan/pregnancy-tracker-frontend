import styles from './JourneyDetails.module.css';
import Image from "next/image";
import { BabyData } from "@/types/journey";

type Props = {
  data: BabyData;
};

export const BabyTab = ({ data }: Props) => {
  return (
    <div className={styles.babyGrid}>
      <div className={styles.imageCard}>
        <Image
          src={data.image}
          alt="baby"
          width={200}
          height={200}
        />
        <p className={styles.sizeText}>
          Ваш малюк зараз розміром з {data.size}
        </p>
      </div>

      <div className={styles.textCard}>
        <p>{data.description}</p>

        {data.fact && (
          <div className={styles.highlight}>
            {data.fact}
          </div>
        )}
      </div>
    </div>
  );
};