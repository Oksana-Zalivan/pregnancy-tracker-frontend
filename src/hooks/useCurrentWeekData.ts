'use client';

import { useEffect, useState } from 'react';

type BabyData = {
  analogy: string | null;
  size: number | null;
  weight: number | null;
  image: string;
  activity: string;
  development: string;
  interestingFact?: string;
};

type CurrentWeekData = {
  weekNumber?: number;
  daysUntilBirth?: number;
  baby: BabyData;
};

export function useCurrentWeekData() {
  const [data, setData] = useState<CurrentWeekData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentWeek = async () => {
      try {
        setIsLoading(true);

        let response = await fetch('/api/weeks/private/current', {
          credentials: 'include',
          cache: 'no-store',
        });

        if (response.status === 401) {
          response = await fetch('/api/weeks/public/current', {
            cache: 'no-store',
          });
        }

        if (!response.ok) {
          throw new Error('Failed to load current week data');
        }

        const json = await response.json();

        setData(json.data ?? json);
      } catch {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCurrentWeek();
  }, []);

  return {
    data,
    baby: data?.baby ?? null,
    isLoading,
  };
}
