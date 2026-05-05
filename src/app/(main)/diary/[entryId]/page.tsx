"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/shared/Container/Container";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";
import { Loader } from "@/components/shared/Loader/Loader";
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

export default function DiaryEntryPage() {
  const params = useParams<{ entryId: string }>();
  const router = useRouter();

  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!params?.entryId) return;
    const fetchEntry = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/diaries", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Не вдалося завантажити запис щоденника");
        }

        const result: DiaryEntriesResponse = await response.json();
        const currentEntry =
          result.data.find((item) => item._id === params.entryId) ?? null;

        setEntry(currentEntry);
      } catch (error) {
        console.error("Помилка завантаження запису щоденника", error);
        toast.error("Не вдалося завантажити запис щоденника");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [params.entryId]);

  const handleEditEntry = (entry: DiaryEntry) => {
    router.push(`/diary/${entry._id}/edit`);
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/diaries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Не вдалося видалити запис щоденника");
      }

      toast.success("Запис щоденника успішно видалено");
      router.push("/diary");
    } catch (error) {
      console.error("Помилка видалення запису щоденника", error);
      toast.error("Не вдалося видалити запис щоденника");
    }
  };

  return (
    <Container>
      <main className={styles.diaryEntryPage}>
        {isLoading ? (
          <Loader size="md" />
        ) : (
          <DiaryEntryDetails
            entry={entry}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        )}
      </main>
    </Container>
  );
}
