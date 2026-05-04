"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const mockEntries: DiaryEntry[] = [];

export default function DiaryPage() {
  const router = useRouter();

  const [entries, setEntries] = useState<DiaryEntry[]>(mockEntries);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(
    mockEntries[0] ?? null,
  );

  const handleSelectEntry = (entry: DiaryEntry) => {
    if (window.innerWidth < 1440) {
      router.push(`/diary/${entry._id}`);
      return;
    }

    setSelectedEntry(entry);
  };

  const handleCreateEntry = () => {
    console.log("create entry");
  };

  const handleEditEntry = (entry: DiaryEntry) => {
    console.log("edit entry", entry);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry._id !== id),
    );

    setSelectedEntry((currentEntry) =>
      currentEntry?._id === id ? null : currentEntry,
    );
  };

  return (
    <Container>
      <main className={styles.diaryPage}>
        <GreetingBlock />

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
      </main>
    </Container>
  );
}
