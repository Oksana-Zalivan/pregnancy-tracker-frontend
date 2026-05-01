"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./TasksReminderCard.module.css";

type Task = {
  _id: string;
  date: string;
  name: string;
  isDone: boolean;
  group?: "today" | "week";
};

export default function TasksReminderCard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

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
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/tasks", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error("Не вдалося завантажити завдання");
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Помилка завантаження завдань", error);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    const token = localStorage.getItem("token");
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
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ isDone: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося оновити завдання");
      }
    } catch (error) {
      console.error("Помилка оновлення завдання", error);
      setTasks(prevTasks);
    }
  };

  const todayTasks = tasks.filter((task) => task.group === "today");
  const weekTasks = tasks.filter((task) => task.group === "week");
  const noGroupTasks = tasks.filter((task) => !task.group);

  const hasGroupedTasks = todayTasks.length > 0 || weekTasks.length > 0;

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
              <img
                src="/icons/check.svg"
                alt="Виконано"
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
          <img
            src="/icons/add.svg"
            alt="Додати завдання"
            className={styles.addTaskIcon}
          />
        </button>
      </div>

      {tasks.length === 0 ? (
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
      ) : hasGroupedTasks ? (
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
              <ul className={styles.tasksList}>
                {noGroupTasks.map(renderTask)}
              </ul>
            </div>
          )}
        </>
      ) : (
        <ul className={styles.tasksList}>{tasks.map(renderTask)}</ul>
      )}

      {isAddTaskModalOpen && (
        <p className={styles.modalPlaceholder}>
          Модальне вікно додавання завдання буде підключено окремо.
        </p>
      )}
    </div>
  );
}
