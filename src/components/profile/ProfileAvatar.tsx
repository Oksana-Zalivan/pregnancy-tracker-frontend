"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { saveUserProfile } from "@/lib/profile-storage";
import type { UserProfile } from "@/types/user-profile";
import styles from "@/components/profile/ProfileAvatar.module.css";

type ProfileAvatarProps = {
  profile: UserProfile;
};

export default function ProfileAvatar({ profile }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    setIsUploading(true);

    try {
      const response = await fetch("/api/users/avatar", {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Не вдалося оновити фото");
        return;
      }

      saveUserProfile(data.data);
      toast.success("Фото профілю оновлено");
    } catch {
      toast.error("Проблема з мережею або сервером. Спробуйте пізніше.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        <Image
          src={profile.avatarUrl}
          alt={`Аватар користувача ${profile.name}`}
          width={144}
          height={144}
          className={styles.avatar}
          unoptimized
        />
      </div>

      <div className={styles.content}>
        <div>
          <h2 className={styles.name}>{profile.name}</h2>
          <p className={styles.email}>{profile.email}</p>
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={openFileDialog}
          disabled={isUploading}
        >
          {isUploading ? "Завантажуємо..." : "Завантажити нове фото"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className={styles.input}
          onChange={handleAvatarChange}
        />
      </div>
    </div>
  );
}
