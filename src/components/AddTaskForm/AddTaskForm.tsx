"use client"

import css from "./AddTaskForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { POST } from "@/app/api/tasks/route.js";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { useId } from "react";
interface AddTaskFormProps {
    onClose: () => void;
}

type FormValues = {
  name: string;
  date: string;
};

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA");

    const initialValues = {
        name: "",
        date: localDate,
    };

    const mutation = useMutation({
    mutationFn: (data: FormValues) => POST(data),
        onSuccess: () => {
            onClose();
        },
        onError: (err) => {
            console.error('Сталась помилка, спробуйте ще раз');
        },
    });

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            setSubmitting(true);
            const payload: FormValues = {
                name: values.name,
                date: values.date,
            };
            await mutation.mutateAsync(payload);
            resetForm();
        } catch (error) {
            console.error('Сталась помилка, спробуйте ще раз');
        } finally {
            setSubmitting(false);
        };
    };

    const Schema = Yup.object().shape({
        name: Yup.string()
            .min(1, "Назва має містити щонайменше 1 символ")
            .max(96, "Назва не може бути довшою за 96 символів")
            .required("Назва є обовʼязковою"),
        date: Yup.date()
            .min(today, "Дата не може бути раніше сьогоднішньої")
            .required("Дата є обовʼязковою"),
    });

    const fieldId = useId();

    return (
        <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Schema}>
            <Form>
                <div>
                    <label htmlFor={`${fieldId}-name`}>Назва завдання</label>
                    <Field id={`${fieldId}-name`} name="name" type="text"></Field>
                    <ErrorMessage component="span" name="name"></ErrorMessage>
                </div>
                <div>
                    <label htmlFor={`${fieldId}-date`}>Дата</label>
                    <Field id={`${fieldId}-date`} name="date" type="date"></Field>
                    <ErrorMessage component="span" name="date"></ErrorMessage>
                </div>
                <button type="submit">
                    Зберегти
                </button>
            </Form>
        </Formik>
    )
};