'use client';

import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import styles from './OnboardingForm.module.css';
import { babySexOptions, type BabySex } from '@/types/user-profile';
import { saveUserProfile } from '@/lib/profile-storage';
import { defaultUserProfile } from '@/types/user-profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const getDateAfterDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const minDueDate = getDateAfterDays(7);
const maxDueDate = getDateAfterDays(280);

// Валідація через Yup
const onboardingSchema = Yup.object({
  babySex: Yup.mixed<BabySex>()
    .oneOf([null, 'girl', 'boy'], 'Оберіть коректне значення')
    .required('Стать дитини є обовʼязковою'),
  dueDate: Yup.date()
    .required('Планова дата пологів є обовʼязковою')
    .min(new Date(minDueDate), 'Дата має бути не раніше ніж через 1 тиждень')
    .max(new Date(maxDueDate), 'Дата має бути не пізніше ніж через 40 тижнів'),
});

export default function OnboardingForm() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        gender: defaultUserProfile.gender,
        dueDate: '',
      }}
      validationSchema={onboardingSchema}
      onSubmit={async (values) => {
        try {
          const response = await fetch('/api/users/profile', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
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
              name="babySex"
              className={`${styles.field} ${styles.select} ${
                errors.gender && touched.gender ? styles.fieldError : ''
              } ${values.gender !== defaultUserProfile.gender ? styles.fieldFilled : ''}`}
            >
              {babySexOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="babySex"
              component="span"
              className={styles.error}
            />
          </label>
          <label className={styles.label}>
            Планова дата пологів
            <Field
              name="dueDate"
              type="date"
              className={`${styles.field} ${styles.dateField} ${errors.dueDate && touched.dueDate ? styles.fieldError : ''} ${values.dueDate ? styles.fieldFilled : ''}`}
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
