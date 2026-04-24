"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import styles from "./RegistrationForm.module.css";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

const initialValues: RegisterValues = {
  name: "",
  email: "",
  password: "",
};

const registerSchema = Yup.object({
  name: Yup.string()
    .max(32, "Ім'я не може бути довшим за 32 символи")
    .required("Ім'я є обов'язковим"),
  email: Yup.string()
    .email("Некоректний формат email")
    .max(64, "Email не може бути довшим за 64 символи")
    .required("Email є обовʼязковим"),
  password: Yup.string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(128, "Пароль не може бути довшим за 128 символів")
    .required("Пароль є обовʼязковим"),
});

export default function RegistrationForm() {
  const handleSubmit = async (
    values: RegisterValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Не вдалося зареєструватися");
        return;
      }

      toast.success("Реєстрацію успішно завершено");
      resetForm();
    } catch {
      toast.error("Помилка сервера. Спробуйте пізніше");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Ім&apos;я
            <Field className={styles.input} type="text" name="name" />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </label>

          <label className={styles.label}>
            Email
            <Field className={styles.input} type="email" name="email" />
            <ErrorMessage name="email" component="p" className={styles.error} />
          </label>

          <label className={styles.label}>
            Пароль
            <Field className={styles.input} type="password" name="password" />
            <ErrorMessage
              name="password"
              component="p"
              className={styles.error}
            />
          </label>

          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
          </button>
          <p className={styles.text}>
            Вже маєте акаунт?{" "}
            <Link href="/auth/login" className={styles.link}>
              Увійти
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
