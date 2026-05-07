'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import ProfileAvatar from '@/components/profile/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/profile/ProfileEditForm/ProfileEditForm';
import { useCurrentUserProfile } from '@/hooks/useCurrentUserProfile';
import styles from '@/components/profile/ProfilePage/ProfilePage.module.css';
import type { UserProfile } from '@/types/user-profile';

export default function ProfilePage() {
  const { profile, isLoading } = useCurrentUserProfile();
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  const currentProfile = localProfile ?? profile;

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setLocalProfile(updatedProfile);
  };

  if (isLoading) {
    return (
      <section className={styles.page}>
        <p className={styles.loader}>Завантажуємо дані профілю...</p>
      </section>
    );
  }

  if (!currentProfile) {
    return (
      <section className={styles.page}>
        <p className={styles.loader}>Не вдалося завантажити профіль.</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <div className={styles.headerBlock}>
          <Breadcrumbs />

          <ProfileAvatar
            profile={currentProfile}
            onProfileUpdate={handleProfileUpdate}
          />
        </div>

        <ProfileEditForm profile={currentProfile} />
      </div>
    </section>
  );
}
