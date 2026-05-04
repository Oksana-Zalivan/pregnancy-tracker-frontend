"use client";
import { useState, useEffect } from "react";
import styles from "./StatusBlock.module.css";

type StatusData = {
  weekNumber: number;
  daysUntilBirth: number;
};

export default function StatusBlock() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/weeks/private/current", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Не вдалося завантажити дані");
        }

        setData(json.data ?? json);
      } catch {
        setError("Не вдалося завантажити дані");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.card}>
          <p className={styles.label}>Тиждень</p>
          <p className={styles.valuePlaceholder}>—</p>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>Днів до зустрічі</p>
          <p className={styles.valuePlaceholder}>—</p>
        </div>
      </section>
    );
  }


  if (error) {
    return (
      <section className={styles.container}>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>{data.weekNumber}</p>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>~{data.daysUntilBirth}</p>
      </div>
    </section>
  );
}
