'use client';

import Image from 'next/image';
import { useRef, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';

import styles from './ProfileAvatar.module.css';
export default function AvatarPicker() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState('/icons/default-avatar.svg');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Перевірка типу файлу
    if (!file.type.startsWith('image/')) {
      toast.error('Оберіть правильний формат зображення');

      e.target.value = '';

      return;
    }

    // Перевірка розміру файлу
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Максимальний дозволений розмір файлу — 5 MB');

      e.target.value = '';

      return;
    }

    const formData = new FormData();

    formData.append('avatar', file);

    // Локальний preview до завантаження
    const localPreview = URL.createObjectURL(file);

    setAvatarUrl(localPreview);

    try {
      setIsUploading(true);

      const response = await fetch('/api/users/avatar', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Не вдалося оновити аватар');

        setAvatarUrl('/icons/default-avatar.svg');

        return;
      }

      setAvatarUrl(data.data.avatar || '/icons/default-avatar.svg');

      toast.success('Фото профілю успішно оновлено');
    } catch {
      toast.error('Проблема з мережею або сервером. Спробуйте пізніше.');
    } finally {
      setIsUploading(false);

      e.target.value = '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <Image
        src={avatarUrl}
        alt="Аватар користувача"
        width={132}
        height={132}
        className={styles.avatar}
        unoptimized
      />

      <button
        type="button"
        className={styles.button}
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? 'Завантаження...' : 'Завантажити нове фото'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleFileChange}
      />
    </div>
  );
}
