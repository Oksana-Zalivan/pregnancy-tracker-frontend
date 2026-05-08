"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/shared/Container/Container";
import PageHeader from '@/components/shared/PageHeader/PageHeader';
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";
import { Loader } from "@/components/shared/Loader/Loader";
import styles from "./page.module.css";
import AddDiaryEntryForm from "@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm";
import Modal from "@/components/shared/Modal/Modal";
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
  const [isModalOpen, setIsModalOpen] = useState(false)
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

 /*  const handleCreateEntry = () => {
    router.push("/diary/create");
  }; */
  const handleCreateEntry = (isOpen: boolean) => {
    setIsModalOpen(isOpen)
  }

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
        <PageHeader />

        {isLoading ? (
          <Loader size="md" />
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
      {isModalOpen && 
      <Modal isOpen = {isModalOpen} onClose={() => setIsModalOpen(false)} >
      <AddDiaryEntryForm onClose={() => setIsModalOpen(false)}/> 
      </Modal>
}
    </Container>
  );
}
