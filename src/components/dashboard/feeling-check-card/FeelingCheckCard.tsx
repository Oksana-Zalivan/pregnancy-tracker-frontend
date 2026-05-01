"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./FeelingCheckCard.module.css";

import AddDiaryEntryModal from "../../diary/AddDiaryEntryModal/AddDiaryEntryModal";
import AddDiaryEntryForm from "../../diary/AddDiaryEntryForm/AddDiaryEntryForm";


export default function FeelingCheckCard() {
  const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/register");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>Як ви себе почуваєте?</h2>

        <p className={styles.text}>
          Рекомендація на сьогодні: занотуйте незвичні відчуття у тілі.
        </p>
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
      >
        Зробити запис у щоденник
      </button>
       {isOpen && (
        <AddDiaryEntryModal onClose={() => setIsOpen(false)}>
          <AddDiaryEntryForm onClose={() => setIsOpen(false)} />
        </AddDiaryEntryModal>
      )}
    </section>
  );
}