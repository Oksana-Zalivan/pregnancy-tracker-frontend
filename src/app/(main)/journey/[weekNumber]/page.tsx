"use client";

import { use } from "react";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/journey/JourneyDetails/JourneyDetails";

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export default function JourneyPage({ params }: Props) {
  // Розпаковуємо пропси через use() для Next.js 15
  const { weekNumber } = use(params);
  const currentWeek = Number(weekNumber) || 1;

  return (
    <>
      <GreetingBlock />
      <WeekSelector currentWeek={currentWeek} />
      <JourneyDetails weekNumber={currentWeek} />
    </>
  );
}