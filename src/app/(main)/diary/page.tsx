'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Container from '@/components/shared/Container/Container';
import PageHeader from '@/components/shared/PageHeader/PageHeader';
import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import { Loader } from '@/components/shared/Loader/Loader';
import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm';
import Modal from '@/components/shared/Modal/Modal';
import styles from './page.module.css';

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

  const fetchEntries = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/diaries', {
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) throw new Error('Не вдалося завантажити записи');

      const result: DiaryEntriesResponse = await response.json();
      setEntries(result.data);
      setSelectedEntry(result.data[0] ?? null);
    } catch (error) {
      console.error(error);
      toast.error('Не вдалося завантажити записи щоденника');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSelectEntry = (entry: DiaryEntry) => {
    if (window.innerWidth < 1024) {
      router.push(`/diary/${entry._id}`);
      return;
    }
    setSelectedEntry(entry);
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      const response = await fetch(`/api/diaries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Не вдалося видалити запис щоденника');

      toast.success('Запис щоденника успішно видалено');
      setEntries((prev) => prev.filter((e) => e._id !== id));
      setSelectedEntry((prev) =>
        prev?._id === id ? (entries.find((e) => e._id !== id) ?? null) : prev,
      );
    } catch (error) {
      console.error(error);
      toast.error('Не вдалося видалити запис щоденника');
    }
  };

  const handleEntryCreated = () => {
    setIsModalOpen(false);
    fetchEntries();
  };

  return (
    <Container>
      <main className={styles.diaryPage}>
        <PageHeader />

        {isLoading ? (
          <Loader size="md" />
        ) : (
          <div className={styles.contentWrapper}>
            <div className={styles.listColumn}>
              <DiaryList
                entries={entries}
                selectedEntryId={selectedEntry?._id}
                onSelectEntry={handleSelectEntry}
                onCreateEntry={() => setIsModalOpen(true)}
              />
            </div>

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
          <AddDiaryEntryForm onClose={handleEntryCreated} />
        </Modal>
      )}
    </Container>
  );
}
