"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { saveUserProfile } from "@/lib/profile-storage";
import {
  babySexOptions,
  type BabySex,
  type UserProfile,
} from "@/types/user-profile";
import styles from "@/components/profile/ProfileEditForm.module.css";

type ProfileEditFormProps = {
  profile: UserProfile;
};

type ProfileFormValues = {
  name: string;
  email: string;
  babySex: BabySex;
  dueDate: string;
};

const profileSchema = Yup.object({
  name: Yup.string()
    .max(32, "Ім'я не може бути довшим за 32 символи")
    .required("Ім'я є обов'язковим"),
  email: Yup.string()
    .email("Некоректний формат email")
    .max(64, "Email не може бути довшим за 64 символи")
    .required("Email є обовʼязковим"),
  babySex: Yup.mixed<BabySex>()
    .oneOf(["unknown", "girl", "boy"], "Оберіть коректне значення")
    .required("Стать дитини є обов'язковою"),
  dueDate: Yup.string().required("Планова дата пологів є обов'язковою"),
});

function buildInitialValues(profile: UserProfile): ProfileFormValues {
  return {
    name: profile.name,
    email: profile.email,
    babySex: profile.babySex,
    dueDate: profile.dueDate,
  };
}

export default function ProfileEditForm({ profile }: ProfileEditFormProps) {
  return (
    <Formik
      initialValues={buildInitialValues(profile)}
      enableReinitialize
      validationSchema={profileSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const response = await fetch("/api/users/profile", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const data = await response.json();

          if (!response.ok) {
            toast.error(data.message || "Не вдалося зберегти зміни");
            return;
          }

          saveUserProfile(data.data);
          resetForm({ values: buildInitialValues(data.data) });
          toast.success("Профіль успішно оновлено");
        } catch {
          toast.error("Проблема з мережею або сервером. Спробуйте пізніше.");
        }
      }}
    >
      {({ dirty, errors, isSubmitting, resetForm, touched }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Ім&apos;я
            <Field
              name="name"
              placeholder="Ваше ім'я"
              className={`${styles.field} ${
                errors.name && touched.name ? styles.fieldError : ""
              }`}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Пошта
            <Field
              name="email"
              type="email"
              placeholder="hello@leleka.com"
              className={`${styles.field} ${
                errors.email && touched.email ? styles.fieldError : ""
              }`}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Стать дитини
            <Field
              as="select"
              name="babySex"
              className={`${styles.field} ${styles.select} ${
                errors.babySex && touched.babySex ? styles.fieldError : ""
              }`}
            >
              {babySexOptions.map((option) => (
                <option key={option.value} value={option.value}>
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
              className={`${styles.field} ${styles.dateField} ${
                errors.dueDate && touched.dueDate ? styles.fieldError : ""
              }`}
            />
            <ErrorMessage
              name="dueDate"
              component="span"
              className={styles.error}
            />
          </label>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => resetForm()}
              disabled={!dirty || isSubmitting}
            >
              Відмінити зміни
            </button>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={!dirty || isSubmitting}
            >
              {isSubmitting ? "Зберігаємо..." : "Зберегти зміни"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
