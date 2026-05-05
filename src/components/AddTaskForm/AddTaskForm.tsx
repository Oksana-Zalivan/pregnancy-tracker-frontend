"use client";

import css from "./AddTaskForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { useId } from "react";
import toast from "react-hot-toast";
import Button from "../shared/Button/Button";
import clsx from "clsx";

interface AddTaskFormProps {
  onClose: () => void;
}

type FormValues = {
  name: string;
  date: string;
};

function getLocalDate() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const today = getLocalDate();

  const initialValues: FormValues = {
    name: "",
    date: today,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(1, "Назва має містити щонайменше 1 символ")
      .max(96, "Назва не може бути довшою за 96 символів")
      .required("Назва є обовʼязковою"),
    date: Yup.string().required("Дата є обовʼязковою"),
  });

  const createTask = async (data: FormValues) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Не вдалося створити завдання");
    }

    return result;
  };

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Завдання створено");
      onClose();
    },
    onError: () => {
      toast.error("Сталась помилка, спробуйте ще раз");
    },
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await mutation.mutateAsync(values);
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-name`}>
              Назва завдання
            </label>

            <Field
              className={clsx(
                css.formField,
                errors.name && touched.name && css.formFieldError
              )}
              id={`${fieldId}-name`}
              name="name"
              type="text"
              placeholder="Прийняти вітаміни"
            />

            <ErrorMessage
              className={css.formError}
              component="span"
              name="name"
            />
          </div>

          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor={`${fieldId}-date`}>
              Дата
            </label>

            <Field
              className={clsx(
                css.formField,
                errors.date && touched.date && css.formFieldError
              )}
              id={`${fieldId}-date`}
              name="date"
              type="date"
              min={today}
            />

            <ErrorMessage
              className={css.formError}
              component="span"
              name="date"
            />
          </div>

          <Button
            className={css.submitButton}
            type="submit"
            disabled={mutation.isPending}
            isLoading={mutation.isPending}
          >
            Зберегти
          </Button>
        </Form>
      )}
    </Formik>
  );
}
