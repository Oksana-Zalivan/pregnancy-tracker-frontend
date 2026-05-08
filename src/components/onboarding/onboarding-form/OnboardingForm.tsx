'use client';

import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import styles from './OnboardingForm.module.css';
import { babySexOptions } from '@/types/user-profile';
import { saveUserProfile } from '@/lib/profile-storage';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
};

const getDateAfterDays = (days: number) => {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);

  return formatDate(date);
};

const minDueDate = getDateAfterDays(7);
const maxDueDate = getDateAfterDays(280);

const onboardingSchema = Yup.object({
  gender: Yup.mixed<'' | 'girl' | 'boy'>()
    .oneOf(['girl', 'boy'], 'Оберіть коректне значення')
    .required('Стать дитини є обовʼязковою'),

  dueDate: Yup.string()
    .required('Планова дата пологів є обовʼязковою')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Некоректний формат дати')
    .test(
      'range',
      'Дата має бути від +1 тижня до +40 тижнів від сьогодні',
      (value) => {
        if (!value) return false;

        return value >= minDueDate && value <= maxDueDate;
      },
    ),
});

export default function OnboardingForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        gender: '' as '' | 'girl' | 'boy',
        dueDate: '',
      }}
      validationSchema={onboardingSchema}
      onSubmit={async (values) => {
        try {
          const response = await fetch('/api/users/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(values),
          });

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.message || 'Не вдалося зберегти зміни');
            return;
          }

          saveUserProfile(data.data);

          toast.success('Вітаю! Профіль успішно оновлено');

          router.push('/');
        } catch {
          toast.error('Проблема з мережею або сервером. Спробуйте пізніше.');
        }
      }}
    >
      {({ dirty, errors, isSubmitting, touched, values }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Стать дитини
            <Field
              as="select"
              name="gender"
              className={`${styles.field} ${styles.select} ${
                errors.gender && touched.gender ? styles.fieldError : ''
              } ${values.gender ? styles.fieldFilled : ''}`}
            >
              {babySexOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="gender"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Планова дата пологів
            <Field
              name="dueDate"
              type="date"
              className={`${styles.field} ${styles.dateField} ${
                errors.dueDate && touched.dueDate ? styles.fieldError : ''
              } ${values.dueDate ? styles.fieldFilled : ''}`}
            />
            <ErrorMessage
              name="dueDate"
              component="span"
              className={styles.error}
            />
          </label>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={!dirty || isSubmitting}
            >
              {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
