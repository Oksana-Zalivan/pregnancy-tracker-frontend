"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import css from "./WeekSelector.module.css";

type WeekSelectorProps = {
    dueDate: string;
}

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const TOTAL_WEEKS = 40;

const parseLocalDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getTodayLocalDateOnly = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export default function WeekSelector({ dueDate }: WeekSelectorProps) {
  const router = useRouter();

  const today = getTodayLocalDateOnly();
  const deliveryDate = parseLocalDate(dueDate);
  deliveryDate.setHours(0, 0, 0, 0);

  const diffMs = deliveryDate.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / MS_IN_DAY);
  const weeksLeft = Math.floor(diffDays / 7);
  const currentWeek = Math.min(Math.max(TOTAL_WEEKS - weeksLeft, 1), TOTAL_WEEKS);
  
  const handleClick = (week: number) => {
    if (week > currentWeek) return;
    router.push(`/journey/${week}`);
  };

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className={css.weeksContainer}>
      {weeks.map((week) => {
        const isFuture = week > currentWeek;
        const isPast = week < currentWeek;
        const isCurrent = week === currentWeek;

        return (
          <button
            key={week}
            type="button"
            className={clsx(
              css.weekButton,
              isFuture && css.futureWeek,
              isPast && css.pastWeek,
              isCurrent && css.currentWeek
            )}
            onClick={() => handleClick(week)}
            disabled={isFuture}
            >
            <div className="box">
            <span className="num-week-txt">{week}</span>
            </div>
            <span className="week-txt">Тиждень</span>
          </button>
        );
      })}
    </div>
  );
}