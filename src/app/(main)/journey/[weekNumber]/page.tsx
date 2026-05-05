"use client";

import { useEffect, useState, use } from "react";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock"; 
// import WeekSelector from "@/components/shared/WeekSelector/WeekSelector";
import { JourneyDetails } from "@/components/journey/JourneyDetails/JourneyDetails";
import { JourneyData } from "@/types/journey";
import { useAuthStore } from "@/store/authStore";
import { use } from "react";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/shared/WeekSelector/WeekSelector";
import { JourneyDetails } from "@/components/journey/JourneyDetails/JourneyDetails";

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export default function JourneyPage({ params }: Props) {
  const { weekNumber } = use(params);
  const currentWeek = Number(weekNumber) || 1;

  const user = useAuthStore((state) => state.user);
  
  const dueDate = (user as { dueDate?: string })?.dueDate || "2026-10-30";

  const [journeyData, setJourneyData] = useState<JourneyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/weeks/${currentWeek}`);
        if (response.ok) {
          const data = await response.json();
          setJourneyData(data);
        }
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentWeek]);

  return (
    <>
      <GreetingBlock />
      
      
      <JourneyDetails data={journeyData as JourneyData} isLoading={isLoading} />
    </>
  );
}
      
//WeekSelector dueDate={dueDate}
      <WeekSelector dueDate="2026-10-01" />
      <JourneyDetails
        data={
          {
            baby: {},
            mom: {},
          } as any
        }
        isLoading={false}
      />
    </>
  );
}
