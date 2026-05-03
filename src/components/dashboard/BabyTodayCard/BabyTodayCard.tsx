import Image from "next/image";
import styles from "./BabyTodayCard.module.css";

export default function BabyTodayCard() {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Малюк сьогодні</h2>

      <div className={styles.top}>
        <Image
          src="/images/large-avocado-desktop.jpg"
          alt="Авокадо"
          width={140}
          height={140}
          className={styles.image}
        />

        <div className={styles.textBlock}>
          <p className={styles.size}>Розмір: приблизно 12 см</p>
          <p className={styles.text}>
            Вага: близько 45 грамів. М'язи обличчя вже працюють.
          </p>
        </div>
      </div>

      <p className={styles.text}>
        У цей час тіло малюка починає вкриватися лануго — ніжним пушком, який
        зберігатиме тепло.
      </p>
    </section>
  );
