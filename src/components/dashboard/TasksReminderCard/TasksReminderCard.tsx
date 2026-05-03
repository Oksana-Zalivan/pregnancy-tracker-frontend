"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./TasksReminderCard.module.css";

type Task = {
  _id: string;
  date: string;
  name: string;
  isDone: boolean;
};

export default function TasksReminderCard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/register");
      return;
    }

    setIsAddTaskModalOpen(true);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setTasks([]);
        return;
      }
      try {
        setIsLoading(true);

        const response = await fetch("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Не вдалося завантажити завдання");
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Помилка завантаження завдань", error);
        toast.error("Не вдалося завантажити завдання");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/register");
      return;
    }

    const newStatus = !task.isDone;
    const prevTasks = tasks;

    setTasks((currentTasks) =>
      currentTasks.map((t) => (t._id === id ? { ...t, isDone: newStatus } : t)),
    );

    try {
      const response = await fetch(`/api/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDone: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося оновити завдання");
      }
    } catch (error) {
      console.error("Помилка оновлення завдання", error);
      toast.error("Не вдалося оновити завдання");
      setTasks(prevTasks);
    }
  };

  const normalizeDate = (date: string) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const todayTasks = sortedTasks.filter(
    (task) => normalizeDate(task.date).getTime() === today.getTime(),
  );

  const weekTasks = sortedTasks.filter((task) => {
    const taskDate = normalizeDate(task.date);

    return taskDate >= tomorrow && taskDate <= nextWeek;
  });

  const noGroupTasks = sortedTasks.filter((task) => {
    const taskDate = normalizeDate(task.date);

    return taskDate > nextWeek || taskDate < today;
  });

  const renderTask = (task: Task) => (
    <li className={styles.taskItem} key={task._id}>
      <div className={styles.taskContent}>
        <p className={styles.taskDate}>{task.date}</p>

        <label className={styles.taskRow}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => handleToggleTask(task._id)}
            className={styles.taskCheckbox}
          />

          <span
            className={
              task.isDone
                ? `${styles.checkboxBox} ${styles.checked}`
                : styles.checkboxBox
            }
          >
            {task.isDone && (
              <Image
                src="/icons/check.svg"
                alt="Виконано"
                width={16}
                height={16}
                className={styles.checkboxIcon}
              />
            )}
          </span>

          <p
            className={
              task.isDone
                ? `${styles.taskText} ${styles.taskTextDone}`
                : styles.taskText
            }
          >
            {task.name}
          </p>
        </label>
      </div>
    </li>
  );

  return (
    <div className={styles.tasksReminderCard}>
      <div className={styles.tasksHeader}>
        <h2 className={styles.tasksTitle}>Важливі завдання</h2>

        <button
          type="button"
          className={styles.addTaskButton}
          onClick={handleAddTask}
        >
          <Image
            src="/icons/add.svg"
            alt="Додати завдання"
            width={24}
            height={24}
            className={styles.addTaskIcon}
          />
        </button>
      </div>

      {isLoading ? (
        <p>Завантаження...</p>
      ) : tasks.length === 0 ? (
        <div className={styles.tasksPlaceholder}>
          <div className={styles.placeholderTextBlock}>
            <p className={styles.placeholderTitle}>
              Наразі немає жодних завдань
            </p>
            <p className={styles.placeholderText}>Створіть мерщій завдання!</p>
          </div>

          <button
            type="button"
            className={styles.createTaskButton}
            onClick={handleAddTask}
          >
            Створити завдання
          </button>
        </div>
      ) : (
        <>
          {todayTasks.length > 0 && (
            <div className={styles.tasksGroup}>
              <p className={styles.tasksGroupTitle}>Сьогодні:</p>
              <ul className={styles.tasksList}>{todayTasks.map(renderTask)}</ul>
            </div>
          )}

          {weekTasks.length > 0 && (
            <div className={styles.tasksGroup}>
              <p className={styles.tasksGroupTitle}>Найближчий тиждень:</p>
              <ul className={styles.tasksList}>{weekTasks.map(renderTask)}</ul>
            </div>
          )}

          {noGroupTasks.length > 0 && (
            <div className={styles.tasksGroup}>
              <p className={styles.tasksGroupTitle}>Інші:</p>
              <ul className={styles.tasksList}>
                {noGroupTasks.map(renderTask)}
              </ul>
            </div>
          )}
        </>
      )}

      {isAddTaskModalOpen && (
        <p className={styles.modalPlaceholder}>
          Модальне вікно додавання завдання буде підключено окремо.
        </p>
      )}
    </div>
  );
}
