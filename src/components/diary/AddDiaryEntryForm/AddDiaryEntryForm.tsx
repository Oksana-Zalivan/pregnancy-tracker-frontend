'use client';

import { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './AddDiaryEntryForm.module.css';

type Emotion = {
  _id: string;
  title: string;
};

type FormValues = {
  title: string;
  description: string;
  emotions: string[];
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(1, 'Назва має містити мінімум 1 символ')
    .max(64, 'Назва не може бути довшою за 64 символи')
    .required('Введіть назву'),

  description: Yup.string()
    .min(1, 'Запис має містити мінімум 1 символ')
    .max(1000, 'Запис не може бути довшим за 1000 символів')
    .required('Введіть текст запису'),

  emotions: Yup.array()
    .min(1, 'Оберіть хоча б одну емоцію')
    .max(12, 'Можна обрати максимум 12 емоцій')
    .required('Оберіть емоцію'),
});

export default function AddDiaryEntryForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [emotionsList, setEmotionsList] = useState<Emotion[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await fetch('/api/emotions', {
          credentials: 'include',
          cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || 'Не вдалося завантажити емоції');
          return;
        }

        setEmotionsList(data.data ?? []);
      } catch {
        toast.error('Не вдалося завантажити емоції');
      }
    };

    void fetchEmotions();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (v: boolean) => void },
  ) => {
    try {
      const response = await fetch('/api/diaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Не вдалося створити запис');
        return;
      }

      toast.success('Запис створено');
      onClose();
    } catch {
      toast.error('Не вдалося створити запис');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        title: '',
        description: '',
        emotions: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>Новий запис</h2>

          <label className={styles.label}>
            Заголовок
            <Field
              type="text"
              name="title"
              placeholder="Введіть заголовок запису"
              className={styles.input}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </label>

          <div className={styles.fieldBlock}>
            <p className={styles.labelText}>Категорії</p>

            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              {/* Trigger — shows selected tags + chevron */}
              <div
                className={styles.dropdownTrigger}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <div className={styles.selectedTags}>
                  {values.emotions.length === 0 ? (
                    <span className={styles.placeholder}>
                      Оберіть категорії
                    </span>
                  ) : (
                    values.emotions.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                        <button
                          type="button"
                          className={styles.tagRemove}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFieldValue(
                              'emotions',
                              values.emotions.filter((t) => t !== tag),
                            );
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
                <span
                  className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`}
                >
                  ▾
                </span>
              </div>

              {/* Dropdown list */}
              {isDropdownOpen && (
                <div className={styles.dropdownList}>
                  {emotionsList.map((emotion) => {
                    const isSelected = values.emotions.includes(emotion.title);
                    return (
                      <label key={emotion._id} className={styles.dropdownItem}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue('emotions', [
                                ...values.emotions,
                                emotion.title,
                              ]);
                            } else {
                              setFieldValue(
                                'emotions',
                                values.emotions.filter(
                                  (t) => t !== emotion.title,
                                ),
                              );
                            }
                          }}
                        />
                        <span>{emotion.title}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <ErrorMessage
              name="emotions"
              component="div"
              className={styles.error}
            />
          </div>

          <label className={styles.label}>
            Запис
            <Field
              as="textarea"
              name="description"
              placeholder="Запишіть, як ви себе відчуваєте"
              className={styles.textarea}
            />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            {isSubmitting ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
