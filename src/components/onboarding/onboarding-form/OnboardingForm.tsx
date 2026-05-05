'use client';

import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import styles from './OnboardingPage.module.css';
import { babySexOptions, type BabySex } from '@/types/user-profile';
import { saveUserProfile } from '@/lib/profile-storage';
import { defaultUserProfile } from '@/types/user-profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';

// Валідація через Yup
const onboardingSchema = Yup.object({
  babySex: Yup.mixed<BabySex>()
    .oneOf(['unknown', 'girl', 'boy'], 'Оберіть коректне значення')
    .required('Стать дитини є обовʼязковою'),
  dueDate: Yup.string().required('Планова дата пологів є обовʼязковою'),
});

export default function OnboardingForm() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        babySex: defaultUserProfile.babySex,
        dueDate: defaultUserProfile.dueDate,
      }}
      validationSchema={onboardingSchema}
      onSubmit={async (values) => {
        try {
          const response = await fetch('/api/users/profile', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.message || 'Не вдалося зберегти зміни');
            return;
          }

          saveUserProfile(data.data);
          toast.success('Вітаю! профіль успішно оновлено');
          router.push('/');
        } catch {
          toast.error('Проблема з мережею або сервером. Спробуйте пізніше.');
        }
      }}
    >
      {({ dirty, errors, isSubmitting, touched }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Стать дитини
            <Field
              as="select"
              name="babySex"
              className={`${styles.field} ${styles.select} ${
                errors.babySex && touched.babySex ? styles.fieldError : ''
              }`}
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
              className={`${styles.field} ${styles.dateField} ${errors.dueDate && touched.dueDate ? styles.fieldError : ''}`}
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
