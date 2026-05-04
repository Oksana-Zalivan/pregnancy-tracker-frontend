"use client";

import { use } from "react";
import Breadcrumbs from "@/components/layout/breadcrumbs/breadcrumbs";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import JourneyWeeksNavigation from "./JourneyWeeksNavigation";

// Імпортуємо готові блоки
import BabyTodayCard from "@/components/dashboard/baby-today-card/BabyTodayCard";
import MomTipCard from "@/components/dashboard/mom-trip-card/MomTipCard";
import TasksReminderCard from "@/components/dashboard/tasks-reminder-card/TasksReminderCard";
import FeelingCheckCard from "@/components/dashboard/feeling-check-card/FeelingCheckCard";

interface PageProps {
  params: Promise<{ weekNumber: string }>;
}

export default function JourneyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const weekNumber = Number(resolvedParams.weekNumber) || 1;

  return (
    <main>
      {/* 1. Навігація верхнього рівня */}
      <Breadcrumbs />
      
      {/* 2. Блок привітання (дані про ім'я тягне сам через API) */}
      <GreetingBlock />

      {/* 3. Перемикач тижнів (горизонтальний список) */}
      <JourneyWeeksNavigation currentWeek={weekNumber} />

      {/* 
          4. Логічні блоки контенту. 
          Оскільки JourneyDetails не існує, ми просто виводимо компоненти, 
          які мають бути на сторінці згідно з макетом.
      */}
      
      <section>
        {/* Картка з малюком (авокадо) */}
        <BabyTodayCard />
        
        {/* Картка з порадою */}
        <MomTipCard />
        
        {/* Картка з завданнями */}
        <TasksReminderCard />
        
        {/* Картка перевірки самопочуття */}
        <FeelingCheckCard />
      </section>
    </main>
  );
}