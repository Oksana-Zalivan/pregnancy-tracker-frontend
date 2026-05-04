"use client"

import css from "./AddTaskForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as Yup from "yup";
import { useId } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Button from "../shared/Button/Button";
import clsx from "clsx";
interface AddTaskFormProps {
    onClose: () => void;
}

type FormValues = {
  name: string;
  date: string;
};

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
    const today = new Date();

    const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const initialValues = {
        name: "",
        date: localDate,
    };

    const [isError, setIsError] = useState(false);

    const createTask = async (data: FormValues) => {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error("Не вдалося створити завдання");
            setIsError(true);
        }
        
        return response.json();
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: FormValues) => createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        },
        onError: (err) => {
            toast.error('Сталась помилка, спробуйте ще раз');
            setIsError(true);
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
        } catch (err) {
            toast.error('Сталась помилка, спробуйте ще раз');
            setIsError(true);
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
        <>
            <Toaster />
            <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit} validationSchema={Schema}>
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label className={css.formLabel} htmlFor={`${fieldId}-name`}>Назва завдання</label>
                        <Field className={clsx(css.formField, isError ? css.formFieldError : undefined)} id={`${fieldId}-name`} name="name" type="text" placeholder="Прийняти вітаміни"></Field>
                        <ErrorMessage className={css.formError} component="span" name="name"></ErrorMessage>
                    </div>
                    <div className={css.formGroup}>
                        <label className={css.formLabel} htmlFor={`${fieldId}-date`}>Дата</label>
                        <Field className={clsx(css.formField, isError ? css.formFieldError : undefined)} id={`${fieldId}-date`} name="date" type="date"></Field>
                        <ErrorMessage className={css.formError} component="span" name="date"></ErrorMessage>
                    </div>
                    <Button className={css.submitButton} type="submit" disabled={mutation.isPending} isLoading={mutation.isPending}>
                        Зберегти
                    </Button>
                </Form>
            </Formik>
        </>
    )
};