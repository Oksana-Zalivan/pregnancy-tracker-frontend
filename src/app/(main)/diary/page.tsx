"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/shared/Container/Container";
import PageHeader from '@/components/shared/PageHeader/PageHeader';
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";
import { Loader } from "@/components/shared/Loader/Loader";
import AddDiaryEntryForm from "@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm";
import Modal from "@/components/shared/Modal/Modal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/diaries", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Не вдалося завантажити записи");

        const result: DiaryEntriesResponse = await response.json();
        setEntries(result.data);
        setSelectedEntry(result.data[0] ?? null);
      } catch (error) {
        console.error(error);
        toast.error("Не вдалося завантажити записи щоденника");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleSelectEntry = (entry: DiaryEntry) => {
    if (window.innerWidth < 1024) {
      router.push(`/diary/${entry._id}`);
      return;
    }
    setSelectedEntry(entry);
  };

  const handleDeleteEntry = async (id: string) => {
    // ... твоя логіка видалення ...
  };

  return (
    <Container>
      <main className={styles.diaryPage}>
        <PageHeader />

        {isLoading ? (
          <Loader size="md" />
        ) : (
          /* ОСЬ ГОЛОВНА ОБГОРТКА ДЛЯ ДВОХ КОЛОНОК */
          <div className={styles.contentWrapper}>
            
            {/* ЛІВА КОЛОНКА */}
            <div className={styles.listColumn}>
              <DiaryList
                entries={entries}
                selectedEntryId={selectedEntry?._id}
                onSelectEntry={handleSelectEntry}
                onCreateEntry={() => setIsModalOpen(true)}
              />
            </div>

            {/* ПРАВА КОЛОНКА */}
            <div className={styles.desktopOnly}>
              <DiaryEntryDetails
                entry={selectedEntry}
                onEdit={(entry) => router.push(`/diary/${entry._id}/edit`)}
                onDelete={handleDeleteEntry}
              />
            </div>

          </div>
        )}
      </main>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddDiaryEntryForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </Container>
  );
}