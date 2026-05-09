'use client';

import { useEffect, useState, useCallback } from 'react';
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

  const fetchTasks = useCallback(async () => {
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

      if (!response.ok) throw new Error('Не вдалося завантажити завдання');

      const data: TasksResponse | Task[] = await response.json();
      setTasks(Array.isArray(data) ? data : (data.data ?? []));
    } catch (error) {
      console.error('Помилка завантаження завдань', error);
      toast.error('Не вдалося завантажити завдання');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => setIsAddTaskModalOpen(true);

  const handleCloseTaskModal = () => {
    setIsAddTaskModalOpen(false);
    fetchTasks();
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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isDone: newStatus }),
      });

      if (!response.ok) throw new Error();
    } catch {
      toast.error('Не вдалося оновити статус');
      setTasks(prevTasks);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const prevTasks = tasks;
    setTasks((current) => current.filter((t) => t._id !== id));

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error();
      toast.success('Завдання видалено');
    } catch {
      toast.error('Не вдалося видалити завдання');
      setTasks(prevTasks);
    }
  };

  const normalizeDate = (date: string) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
    });

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowTime = tomorrow.getTime();

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const nextWeekTime = nextWeek.getTime();

  const todayTasks = sortedTasks.filter(
    (t) => normalizeDate(t.date) === todayTime,
  );
  const weekTasks = sortedTasks.filter((t) => {
    const time = normalizeDate(t.date);
    return time >= tomorrowTime && time <= nextWeekTime;
  });
  const otherTasks = sortedTasks.filter((t) => {
    const time = normalizeDate(t.date);
    return time > nextWeekTime || time < todayTime;
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
          className={`${styles.checkboxBox} ${task.isDone ? styles.checked : ''}`}
        >
          {task.isDone && (
            <svg className={styles.checkboxIcon} width="12" height="12">
              <use href="/images/sprite.svg#icon-check" />
            </svg>
          )}
        </span>
        <span
          className={`${styles.taskText} ${task.isDone ? styles.taskTextDone : ''}`}
        >
          {task.name}
        </span>
      </label>
      <button
        type="button"
        onClick={() => handleDeleteTask(task._id)}
        aria-label="Видалити завдання"
        className={styles.deleteTaskButton}
      >
        <svg width="16" height="16">
          <use href="/images/sprite.svg#icon-trash" />
        </svg>
      </button>
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
          <svg className={styles.addTaskIcon} width="24" height="24">
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
