"use client";

import { useAuthStore } from "@/store/authStore";
import styles from './GreetingBlock.module.css';

export default function GreetingBlock() {
  // Отримуємо дані користувача з глобального стейту 
  const user = useAuthStore((state) => state.user);

  // Формуємо текст привітання залежно від наявності імені користувача
  const greetingText = user?.name 
    ? `Вітаю, ${user.name}!` 
    : "Вітаю!";

  return (
    <div className={styles.container}>
      
      <h2 className={styles.title}>{greetingText}</h2>
    </div>
  );
}