"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
        let message = "Не вдалося зареєструватися";

        if (response.status === 409) {
          message = "Користувач з таким email вже існує";
        } else if (response.status === 400) {
          message = data.message || "Невірні дані";
        }

        toast.error(message);
        return;
      }

      toast.success("Реєстрацію успішно завершено");

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      resetForm();
      router.push("/");
    } catch {
      toast.error("Проблема з мережею або сервером. Спробуйте пізніше.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Ім’я*
            <Field
              name="name"
              placeholder="Ваше ім’я"
              className={`${styles.input} ${
                errors.name && touched.name ? styles.inputError : ""
              }`}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Пошта*
            <Field
              name="email"
              type="email"
              placeholder="hello@leleka.com"
              className={`${styles.input} ${
                errors.email && touched.email ? styles.inputError : ""
              }`}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Пароль*
            <Field
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="********"
              className={`${styles.input} ${
                errors.password && touched.password ? styles.inputError : ""
              }`}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.error}
            />
          </label>

          <button
            type="submit"
            className={`${styles.button} ${
              isSubmitting ? styles.buttonLoading : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.signal} aria-label="Завантаження" />
            ) : (
              "Зареєструватись"
            )}
          </button>

          <p className={styles.authText}>
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
