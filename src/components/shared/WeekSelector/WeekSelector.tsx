"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import css from "./WeekSelector.module.css";

type WeekSelectorProps = {
  dueDate: string;
};

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
  const params = useParams<{ weekNumber?: string }>();
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeWeekRef = useRef<HTMLButtonElement | null>(null);

  const today = getTodayLocalDateOnly();
  const deliveryDate = parseLocalDate(dueDate);
  deliveryDate.setHours(0, 0, 0, 0);

  const diffMs = deliveryDate.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / MS_IN_DAY);
  const weeksLeft = Math.floor(diffDays / 7);

  const maxAvailableWeek = Math.min(Math.max(TOTAL_WEEKS - weeksLeft, 1), TOTAL_WEEKS);
  const activeWeek = Number(params?.weekNumber) || maxAvailableWeek;

  useEffect(() => {
    if (activeWeekRef.current) {
      activeWeekRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeWeek]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleClick = (week: number) => {
    if (week > maxAvailableWeek) return;
    router.push(`/journey/${week}`, { scroll: false });
  };

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className={css.weeksContainer} ref={containerRef}>
      {weeks.map((week) => {
        const isFuture = week > maxAvailableWeek;
        const isActive = week === activeWeek;
        const isAvailable = week <= maxAvailableWeek && week !== activeWeek;

        return (
          <button
            key={week}
            ref={isActive ? activeWeekRef : null}
            type="button"
            className={clsx(
              css.weekButton,
              isFuture && css.futureWeek,
              isAvailable && css.pastWeek,
              isActive && css.currentWeek
            )}
            onClick={() => handleClick(week)}
            disabled={isFuture}
          >
            <div className={css.box}>
              <span className={css.numWeekTxt}>{week}</span>
            </div>
            <span className={css.weekTxt}>Тиждень</span>
          </button>
        );
      })}
    </div>
  );
}