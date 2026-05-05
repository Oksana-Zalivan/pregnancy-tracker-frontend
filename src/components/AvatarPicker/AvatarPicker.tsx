'use client';
import { useState } from 'react';

const AvatarPicker = () => {
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    //   Перевірка розширення файлу та розмір зображення
    if (file) {
      // перевірка типу файлу
      if (!file.type.startsWith('image/')) {
        setError('Тільки зображення');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Максимальний дозволений розмір файлу 5Мб');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Відображаємо превю якщо зобр. існує */}
      {previewUrl ? (
        <Image src={previewUrl} alt="Preview" width={300} height={300} />
      ) : (
        <label>
          {' '}
          Chose photo
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
