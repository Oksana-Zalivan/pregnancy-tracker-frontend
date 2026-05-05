"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import AddDiaryEntryModal from "@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal";
import AddDiaryEntryForm from "@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm";
import styles from "./FeelingCheckCard.module.css";

export default function FeelingCheckCard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!user) {
      router.push("/auth/register");
      return;
    }

    setIsOpen(true);
  };

  return (
    <section className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>Як ви себе почуваєте?</h2>

        <p className={styles.text}>
          Рекомендація на сьогодні: занотуйте незвичні відчуття у тілі.
        </p>
      </div>

      <button type="button" className={styles.button} onClick={handleClick}>
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
