'use client';

import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './AddDiaryEntryForm.module.css';

type Emotion = {
  _id: string;
  name?: string;
  title?: string;
  label?: string;
  value?: string;
  emotion?: string;
  emoji?: string;
  icon?: string;
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

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (v: boolean) => void },
  ) => {
    try {
      const response = await fetch('/api/diaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const getEmotionText = (emotion: Emotion) => {
    return (
      emotion.name ||
      emotion.title ||
      emotion.label ||
      emotion.value ||
      emotion.emotion ||
      'Емоція'
    );
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
            Назва
            <Field
              type="text"
              name="title"
              placeholder="Назва запису"
              className={styles.input}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </label>

          <div className={styles.fieldBlock}>
            <p className={styles.labelText}>Емоції</p>

            <div className={styles.categories}>
              {emotionsList.map((emotion) => (
                <label key={emotion._id} className={styles.category}>
                  <input
                    type="checkbox"
                    checked={values.emotions.includes(emotion._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('emotions', [
                          ...values.emotions,
                          emotion._id,
                        ]);
                      } else {
                        setFieldValue(
                          'emotions',
                          values.emotions.filter((id) => id !== emotion._id),
                        );
                      }
                    }}
                  />

                  <span>
                    {emotion.emoji || emotion.icon
                      ? `${emotion.emoji || emotion.icon} `
                      : ''}
                    {getEmotionText(emotion)}
                  </span>
                </label>
              ))}
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
              placeholder="Текст запису"
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
