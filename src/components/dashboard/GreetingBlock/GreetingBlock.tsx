'use client';

import { useAuthStore } from '@/store/authStore';
import styles from './GreetingBlock.module.css';

export default function GreetingBlock() {
  const user = useAuthStore((state) => state.user);

  const userName = user?.name?.trim();

  const currentHour = new Date().getHours();

  let greeting = 'Доброго дня';

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Доброго ранку';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Доброго дня';
  } else {
    greeting = 'Доброго вечора';
  }

  const greetingText = userName ? `${greeting}, ${userName}!` : `${greeting}!`;

  return (
    <section className={styles.greeting}>
      <h1 className={styles.title}>{greetingText}</h1>
    </section>
  );
}