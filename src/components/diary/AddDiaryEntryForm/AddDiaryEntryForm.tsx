"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./AddDiaryEntryForm.module.css";

type FormValues = {
  title: string;
  description: string;
  emotions: string[];
};

const emotionsList = ["Радість", "Сум", "Тривога", "Спокій"];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(1, "Назва має містити мінімум 1 символ")
    .max(64, "Назва не може бути довшою за 64 символи")
    .required("Введіть назву"),
  description: Yup.string()
    .min(1, "Запис має містити мінімум 1 символ")
    .max(1000, "Запис не може бути довшим за 1000 символів")
    .required("Введіть текст запису"),
  emotions: Yup.array()
    .min(1, "Оберіть хоча б одну емоцію")
    .max(12, "Можна обрати максимум 12 емоцій")
    .required("Оберіть емоцію"),
});

export default function AddDiaryEntryForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (v: boolean) => void }
  ) => {
    try {
      const response = await fetch("/api/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Не вдалося створити запис");
        return;
      }

      toast.success("Запис створено");
      onClose();
    } catch {
      toast.error("Не вдалося створити запис");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        description: "",
        emotions: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>Новий запис</h2>

          <Field
            type="text"
            name="title"
            placeholder="Назва запису"
            className={styles.input}
          />
          <ErrorMessage name="title" component="div" className={styles.error} />

          <div className={styles.categories}>
            {emotionsList.map((emotion) => (
              <label key={emotion}>
                <input
                  type="checkbox"
                  checked={values.emotions.includes(emotion)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldValue("emotions", [...values.emotions, emotion]);
                    } else {
                      setFieldValue(
                        "emotions",
                        values.emotions.filter((item) => item !== emotion)
                      );
                    }
                  }}
                />
                {emotion}
              </label>
            ))}
          </div>
          <ErrorMessage
            name="emotions"
            component="div"
            className={styles.error}
          />

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

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            {isSubmitting ? "Збереження..." : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
