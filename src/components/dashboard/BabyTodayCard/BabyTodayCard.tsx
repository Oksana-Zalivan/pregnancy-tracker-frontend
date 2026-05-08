"use client";

import Image from "next/image";
import styles from "./BabyTodayCard.module.css";
import { useEffect, useState } from "react";

type WeekData = {
  analogy: string | null;
  size: number;
  weight: number;
  image: string;
  activity: string;
  development: string;
  interestingFact: string;
};

export default function BabyTodayCard() {
  const [data, setData] = useState<WeekData | null>(null);

  useEffect(() => {
    const fetchWeekData = async () => {
      try {
        const response = await fetch("/api/weeks/private/current", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) return;

        const json = await response.json();
        setData(json.baby);
      } catch {
        console.error("Не вдалося завантажити дані тижня");
      }
    };

    fetchWeekData();
  }, []);

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Малюк сьогодні</h2>

      <div className={styles.top}>
        {data?.image && (
          <Image
            src={data.image}
            alt="Малюк"
            width={140}
            height={140}
            className={styles.image}
          />
        )}

        <div className={styles.textBlock}>
          <p className={styles.size}> <span className={styles.textBlockMain}>Розмір:</span> {data?.size ?? "..."} см</p>
          <p className={styles.text}> <span className={styles.textBlockMain}>Вага:</span> {data?.weight ?? "..."} г</p>
          <p className={styles.activity}> <span className={styles.textBlockMain}>Активність:</span> {data?.activity}</p>
        </div>
      </div>

      <p className={styles.text}>{data?.development}</p>
    </section>
  );
}