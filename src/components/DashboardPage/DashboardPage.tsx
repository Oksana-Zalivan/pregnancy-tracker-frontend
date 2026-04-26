"use client";
import styles from "./DashboardPage.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  date: string;
  title: string;
  completed: boolean;
  group?: "today" | "week";
};

const useAuth = () => {
  // TODO: replace with real auth logic
  return {
    isAuth: true,
  };
};

const useUserTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // TODO: replace with user tasks module
  return {
    tasks,
    setTasks,
  };
};

export default function DashboardPage() {
  const { tasks, setTasks } = useUserTasks();
  const router = useRouter();
  const { isAuth } = useAuth();
  // const [tasks, setTasks] = useState<Task[]>([
  //   {
  //     id: 1,
  //     date: "22.07",
  //     title: "Записатися на другий плановий скринінг за 3 дні",
  //     completed: false,
  //     group: "today",
  //   },
  //   {
  //     id: 2,
  //     date: "22.07",
  //     title: "Прийняти вітаміни для вагітних",
  //     completed: false,
  //     group: "today",
  //   },
  //   {
  //     id: 3,
  //     date: "22.07",
  //     title: "Відвідати плановий скринінг",
  //     completed: false,
  //     group: "week",
  //   },
  // ]);
  // const [tasks, setTasks] = useState<Task[]>([]);

  const handleToggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = !task.completed;

    const prevTasks = tasks;

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, completed: newStatus } : t)),
    );

    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: newStatus }),
      });
    } catch (error) {
      console.error("Помилка оновлення задачі", error);
    }
  };

  const handleAddTask = () => {
    if (!isAuth) {
      router.push("/auth/register");
      return;
    }
    console.log("Open AddTaskModal"); // TODO: open AddTaskModal
  };

  const todayTasks = tasks.filter((task) => task.group === "today");
  const weekTasks = tasks.filter((task) => task.group === "week");
  const noGroupTasks = tasks.filter((task) => !task.group);

  const hasGroupedTasks = todayTasks.length > 0 || weekTasks.length > 0;

  return (
    <main className={styles.page}>
      {/* Верх */}
      <div className={styles.topRow}>
        <div className={styles.greetingBlock}>GreetingBlock</div>
        <div className={styles.statusBlock}>StatusBlock</div>
      </div>

      {/* Нижня частина */}
      <div className={styles.content}>
        {/* Ліва колонка */}
        <div className={styles.leftColumn}>
          <div className={styles.babyTodayCard}>BabyTodayCard</div>
          <div className={styles.momTipCard}>MomTipCard</div>
        </div>

        {/* Права колонка */}
        <div className={styles.rightColumn}>
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
                  alt="Add button"
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
                  <p className={styles.placeholderText}>
                    Створіть мершій нове завдання!
                  </p>
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

                    <ul className={styles.tasksList}>
                      {todayTasks.map((task) => (
                        <li className={styles.taskItem} key={task.id}>
                          <div className={styles.taskContent}>
                            <p className={styles.taskDate}>{task.date}</p>

                            <label className={styles.taskRow}>
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleTask(task.id)}
                                className={styles.taskCheckbox}
                              />

                              <span className={styles.customCheckbox}></span>

                              <p
                                className={
                                  task.completed
                                    ? `${styles.taskText} ${styles.taskTextDone}`
                                    : styles.taskText
                                }
                              >
                                {task.title}
                              </p>
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {weekTasks.length > 0 && (
                  <div className={styles.tasksGroup}>
                    <p className={styles.tasksGroupTitle}>
                      Найближчий тиждень:
                    </p>

                    <ul className={styles.tasksList}>
                      {weekTasks.map((task) => (
                        <li className={styles.taskItem} key={task.id}>
                          <div className={styles.taskContent}>
                            <p className={styles.taskDate}>{task.date}</p>

                            <label className={styles.taskRow}>
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleTask(task.id)}
                                className={styles.taskCheckbox}
                              />

                              <span className={styles.customCheckbox}></span>

                              <p
                                className={
                                  task.completed
                                    ? `${styles.taskText} ${styles.taskTextDone}`
                                    : styles.taskText
                                }
                              >
                                {task.title}
                              </p>
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {noGroupTasks.length > 0 && (
                  <div className={styles.tasksGroup}>
                    <ul className={styles.tasksList}>
                      {noGroupTasks.map((task) => (
                        <li className={styles.taskItem} key={task.id}>
                          <div className={styles.taskContent}>
                            <p className={styles.taskDate}>{task.date}</p>

                            <label className={styles.taskRow}>
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggleTask(task.id)}
                                className={styles.taskCheckbox}
                              />

                              <span className={styles.customCheckbox}></span>

                              <p
                                className={
                                  task.completed
                                    ? `${styles.taskText} ${styles.taskTextDone}`
                                    : styles.taskText
                                }
                              >
                                {task.title}
                              </p>
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <ul className={styles.tasksList}>
                {tasks.map((task) => (
                  <li className={styles.taskItem} key={task.id}>
                    <div className={styles.taskContent}>
                      <p className={styles.taskDate}>{task.date}</p>

                      <label className={styles.taskRow}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                          className={styles.taskCheckbox}
                        />

                        <span className={styles.customCheckbox}></span>

                        <p
                          className={
                            task.completed
                              ? `${styles.taskText} ${styles.taskTextDone}`
                              : styles.taskText
                          }
                        >
                          {task.title}
                        </p>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.feelingCheckCard}>FeelingCheckCard</div>
        </div>
      </div>
    </main>
  );
}
