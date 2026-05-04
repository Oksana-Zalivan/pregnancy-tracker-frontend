"use client";

import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { useCurrentUserProfile } from "@/hooks/useCurrentUserProfile";
import styles from "@/components/profile/ProfilePage.module.css";

export default function ProfilePage() {
  const { profile, isLoading } = useCurrentUserProfile();

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h1 className={styles.title}>Профіль</h1>
          <p className={styles.subtitle}>
            Оновлюйте свої дані, щоб вони синхронно відображались у застосунку.
          </p>
        </div>

        {isLoading ? (
          <div className={styles.loader}>Завантажуємо дані профілю...</div>
        ) : (
          <>
            <ProfileAvatar profile={profile} />
            <ProfileEditForm profile={profile} />
          </>
        )}
      </div>
    </section>
  );
}
