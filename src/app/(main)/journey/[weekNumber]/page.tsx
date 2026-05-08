'use client';

import { useEffect, useState, use } from "react";
import WeekSelector from "@/components/shared/WeekSelector/WeekSelector";
import { JourneyDetails } from "@/components/journey/JourneyDetails/JourneyDetails";
import { JourneyData } from "@/types/journey";
import { useAuthStore } from "@/store/authStore";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import Container from "@/components/shared/Container/Container";
type Props = {
  params: Promise<{ weekNumber: string }>;
};

export default function JourneyPage({ params }: Props) {
  const { weekNumber } = use(params);
  const currentWeek = Number(weekNumber) || 1;

  const user = useAuthStore((state) => state.user);
  const dueDate = (user as { dueDate?: string })?.dueDate || '2026-10-30';

  const [journeyData, setJourneyData] = useState<JourneyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [babyResponse, momResponse] = await Promise.all([
          fetch(`/api/weeks/${currentWeek}/baby`),
          fetch(`/api/weeks/${currentWeek}/mom-body`),
        ]);

        if (babyResponse.ok && momResponse.ok) {
          const babyData = await babyResponse.json();
          const momData = await momResponse.json();

          setJourneyData({
            baby: babyData.data || babyData,
            mom: momData.data || momData,
          });
        } else {
          const babyError = await babyResponse
            .json()
            .catch(() => ({ message: 'Помилка парсингу JSON' }));
          const momError = await momResponse
            .json()
            .catch(() => ({ message: 'Помилка парсингу JSON' }));

          console.error(`Baby API (Статус ${babyResponse.status}):`, babyError);
          console.error(`Mom API (Статус ${momResponse.status}):`, momError);

          setJourneyData(null);
        }
      } catch (error) {
        console.error('Помилка завантаження даних (Network Error):', error);
        setJourneyData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentWeek]);

  return (
    <Container>
      <PageHeader />

      <WeekSelector dueDate={dueDate} />

      {isLoading || journeyData ? (
        <JourneyDetails
          data={journeyData as JourneyData}
          isLoading={isLoading}
        />
      ) : null}
    </Container>
  );
}
