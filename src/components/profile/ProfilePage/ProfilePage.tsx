"use client";

import { useState } from "react";
import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm/ProfileEditForm";
import { useCurrentUserProfile } from "@/hooks/useCurrentUserProfile";
import styles from "@/components/profile/ProfilePage/ProfilePage.module.css";
import type { UserProfile } from "@/types/user-profile";

export default function ProfilePage() {
  const { profile, isLoading } = useCurrentUserProfile();
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  const currentProfile = localProfile ?? profile;

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setLocalProfile(updatedProfile);
  };

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
            <ProfileAvatar
              profile={currentProfile}
              onProfileUpdate={handleProfileUpdate}
            />
            <ProfileEditForm profile={currentProfile} />
          </>
        )}
      </div>
    </section>
  );
}
