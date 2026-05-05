"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import styles from "./LoginForm.module.css";

type LoginValues = {
  email: string;
  password: string;
};

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Некоректний формат email")
    .max(64, "Email не може бути довшим за 64 символи")
    .required("Email є обовʼязковим"),
  password: Yup.string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(128, "Пароль не може бути довшим за 128 символів")
    .required("Пароль є обовʼязковим"),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: LoginValues) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Не вдалося увійти");
        return;
      }

      const currentUserResponse = await fetch("/api/users/current", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!currentUserResponse.ok) {
        toast.error("Не вдалося отримати дані користувача");
        return;
      }

      const currentUser = await currentUserResponse.json();

      setUser(currentUser.data);
      toast.success("Вхід виконано успішно");
      router.push("/");
    } catch {
      toast.error("Проблема з мережею або сервером. Спробуйте пізніше.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            <span className={styles.visuallyHidden}>Пошта</span>
            <Field
              name="email"
              type="email"
              placeholder="Пошта"
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
            <span className={styles.visuallyHidden}>Пароль</span>
            <Field
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Пароль"
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
              "Увійти"
            )}
          </button>

          <p className={styles.authText}>
            Немає акаунту?{" "}
            <Link href="/auth/register" className={styles.link}>
              Зареєструватися
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
