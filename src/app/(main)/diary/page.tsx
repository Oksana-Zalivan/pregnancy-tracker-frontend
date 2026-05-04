"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/shared/Container/Container";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";
import styles from "./page.module.css";

type DiaryEntry = {
  _id: string;
  title: string;
  date: string;
  description: string;
  emotions: string[];
};

type DiaryEntriesResponse = {
  message: string;
  data: DiaryEntry[];
};

export default function DiaryPage() {
  const router = useRouter();

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/diary", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Не вдалося завантажити записи щоденника");
        }

        const result: DiaryEntriesResponse = await response.json();

        setEntries(result.data);
        setSelectedEntry(result.data[0] ?? null);
      } catch (error) {
        console.error("Помилка завантаження записів щоденника", error);
        toast.error("Не вдалося завантажити записи щоденника");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleSelectEntry = (entry: DiaryEntry) => {
    if (window.innerWidth < 1440) {
      router.push(`/diary/${entry._id}`);
      return;
    }

    setSelectedEntry(entry);
  };

  const handleCreateEntry = () => {
    router.push("/diary/create");
  };

  const handleEditEntry = (entry: DiaryEntry) => {
    router.push(`/diary/${entry._id}/edit`);
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/diary/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Не вдалося видалити запис");
      }

      setEntries((currentEntries) => {
        const updatedEntries = currentEntries.filter(
          (entry) => entry._id !== id,
        );

        setSelectedEntry((currentEntry) => {
          if (currentEntry?._id !== id) {
            return currentEntry;
          }

          return updatedEntries[0] ?? null;
        });

        return updatedEntries;
      });

      toast.success("Запис успішно видалено");
    } catch (error) {
      console.error("Помилка видалення запису", error);
      toast.error("Не вдалося видалити запис");
    }
  };

  return (
    <Container>
      <main className={styles.diaryPage}>
        <GreetingBlock />

        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <>
            <DiaryList
              entries={entries}
              selectedEntryId={selectedEntry?._id}
              onSelectEntry={handleSelectEntry}
              onCreateEntry={handleCreateEntry}
            />

            <div className={styles.desktopOnly}>
              <DiaryEntryDetails
                entry={selectedEntry}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
              />
            </div>
          </>
        )}
      </main>
    </Container>
  );
}
