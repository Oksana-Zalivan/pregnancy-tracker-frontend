"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import type { UserProfile } from "@/lib/types/profile";
import styles from "./ProfileAvatar.module.css";

type ProfileAvatarProps = {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
};

export default function ProfileAvatar({
  profile,
  onProfileUpdate,
}: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Оберіть файл зображення.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsUploading(true);

      const response = await fetch("/api/users/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Не вдалося оновити аватар.");
        return;
      }

      onProfileUpdate(data.profile);
      toast.success("Фото профілю оновлено.");
    } catch {
      toast.error("Проблема з мережею або сервером. Спробуйте пізніше.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.avatarWrapper}>
          <Image
            src={profile.avatarUrl}
            alt={`Аватар користувача ${profile.name}`}
            width={132}
            height={132}
            className={styles.avatar}
            unoptimized
          />
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>{profile.name}</h2>
          <p className={styles.email}>{profile.email}</p>
          <button
            type="button"
            className={styles.button}
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? "Завантаження..." : "Завантажити нове фото"}
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleFileChange}
      />
    </section>
  );
}
