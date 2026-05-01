"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./AddDiaryEntryForm.module.css";

const validationSchema = Yup.object({
  title: Yup.string().required("Введіть назву"),
  text: Yup.string().required("Введіть текст"),
  categories: Yup.array().min(1, "Оберіть хоча б одну категорію"),
});

const categoriesList = ["Радість", "Сум", "Тривога", "Спокій"];

export default function AddDiaryEntryForm({ onClose }: { onClose: () => void }) {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/diaries`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose(); 
    } catch (error) {
      alert("Помилка при створенні запису");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        text: "",
        categories: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={styles.form}>
          <h2>Новий запис</h2>

          <Field
            type="text"
            name="title"
            placeholder="Назва запису"
            className={styles.input}
          />
          <ErrorMessage name="title" component="div" className={styles.error} />

          <div className={styles.categories}>
            {categoriesList.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={values.categories.includes(cat)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldValue("categories", [...values.categories, cat]);
                    } else {
                      setFieldValue(
                        "categories",
                        values.categories.filter((c: string) => c !== cat)
                      );
                    }
                  }}
                />
                {cat}
              </label>
            ))}
          </div>
          <ErrorMessage name="categories" component="div" className={styles.error} />

          <Field
            as="textarea"
            name="text"
            placeholder="Текст запису"
            className={styles.textarea}
          />
          <ErrorMessage name="text" component="div" className={styles.error} />

          <button type="submit" disabled={isSubmitting} className={styles.button}>
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}