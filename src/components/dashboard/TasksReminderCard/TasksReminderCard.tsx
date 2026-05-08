'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/shared/Button/Button';
import { Loader } from '@/components/shared/Loader/Loader';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';
import styles from './TasksReminderCard.module.css';

type Task = {
  _id: string;
  date: string;
  name: string;
  isDone: boolean;
};

type TasksResponse = {
  message: string;
  data: Task[];
};

export default function TasksReminderCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/tasks', {
        credentials: 'include',
        cache: 'no-store',
      });

      if (response.status === 401) {
        setTasks([]);
        return;
      }

      if (!response.ok) {
        throw new Error('Не вдалося завантажити завдання');
      }

      const data: TasksResponse | Task[] = await response.json();
      setTasks(Array.isArray(data) ? data : (data.data ?? []));
    } catch (error) {
      console.error('Помилка завантаження завдань', error);
      toast.error('Не вдалося завантажити завдання');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchTasks();
  }, []);

  const handleAddTask = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsAddTaskModalOpen(false);
    void fetchTasks();
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((item) => item._id === id);

    if (!task) return;

    const newStatus = !task.isDone;
    const prevTasks = tasks;

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item._id === id ? { ...item, isDone: newStatus } : item,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isDone: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Не вдалося оновити завдання');
      }
    } catch (error) {
      console.error('Помилка оновлення завдання', error);
      toast.error('Не вдалося оновити завдання');
      setTasks(prevTasks);
    }
  };

  const normalizeDate = (date: string) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
    });
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

  const otherTasks = sortedTasks.filter((task) => {
    const taskDate = normalizeDate(task.date);
    return taskDate > nextWeek || taskDate < today;
  });

  const renderTask = (task: Task) => (
    <li className={styles.taskItem} key={task._id}>
      <p className={styles.taskDate}>{formatDate(task.date)}</p>

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
        />

        <span
          className={
            task.isDone
              ? `${styles.taskText} ${styles.taskTextDone}`
              : styles.taskText
          }
        >
          {task.name}
        </span>
      </label>
    </li>
  );

  return (
    <section className={styles.tasksReminderCard}>
      <div className={styles.tasksHeader}>
        <h2 className={styles.tasksTitle}>Важливі завдання</h2>

        <Button
          type="button"
          className={styles.addTaskButton}
          onClick={handleAddTask}
        >
          <svg
            className={styles.addTaskIcon}
            width="24"
            height="24"
            aria-label="add task"
          >
            <use href="/images/sprite.svg#icon-add" />
          </svg>
        </Button>
      </div>

      <div className={styles.tasksBody}>
        {isLoading ? (
          <Loader size="md" />
        ) : tasks.length === 0 ? (
          <div className={styles.tasksPlaceholder}>
            <div className={styles.placeholderTextBlock}>
              <p className={styles.placeholderTitle}>
                Наразі немає жодних завдань
              </p>
              <p className={styles.placeholderText}>
                Створіть мерщій нове завдання!
              </p>
            </div>

            <Button
              type="button"
              className={styles.createTaskButton}
              onClick={handleAddTask}
            >
              Створити завдання
            </Button>
          </div>
        ) : (
          <>
            {todayTasks.length > 0 && (
              <div className={styles.tasksGroup}>
                <p className={styles.tasksGroupTitle}>Сьогодні:</p>
                <ul className={styles.tasksList}>
                  {todayTasks.map(renderTask)}
                </ul>
              </div>
            )}

            {weekTasks.length > 0 && (
              <div className={styles.tasksGroup}>
                <p className={styles.tasksGroupTitle}>Найближчий тиждень:</p>
                <ul className={styles.tasksList}>
                  {weekTasks.map(renderTask)}
                </ul>
              </div>
            )}

            {otherTasks.length > 0 && (
              <div className={styles.tasksGroup}>
                <p className={styles.tasksGroupTitle}>Інші:</p>
                <ul className={styles.tasksList}>
                  {otherTasks.map(renderTask)}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {isAddTaskModalOpen && (
        <AddTaskModal onClose={handleCloseTaskModal}>
          <AddTaskForm onClose={handleCloseTaskModal} />
        </AddTaskModal>
      )}
    </section>
  );
}
