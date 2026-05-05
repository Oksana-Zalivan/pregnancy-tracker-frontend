'use client';
import Image from 'next/image';
import { useRef, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import styles from './AvatarPicker.module.css';

export default function AvatarPicker() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('/icons/default-avatar.svg');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    //   Перевірка розширення файлу та розмір зображення
    if (!file.type.startsWith('image/')) {
      toast.error('Оберіть вірний формат файлу для зображення');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        'Максимальний дозволений розмір файлу 5Мб та максимальний ширина та висота 1024px',
      );
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const localPreview = URL.createObjectURL(file);
    setAvatarUrl(localPreview);

    try {
      setIsUploading(true);
      const response = await fetch('/api/users/avatar', {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Не вдалося оновити аватар.');
        setAvatarUrl('/icons/default-avatar.svg');
        return;
      }

      setAvatarUrl(data.data.avatarUrl);
      toast.success('Фото профілю оновлено.');
    } catch {
      toast.error('Проблема з мережею або сервером. Спробуйте пізніше.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <Image
        src={avatarUrl}
        alt={'Аватар користувача'}
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
        {isUploading ? 'Завантаження...' : 'Завантажити фото'}
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
