"use client";

import { useParams } from "next/navigation";
import Container from "@/components/shared/Container/Container";
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

export default function DiaryEntryPage() {
  const params = useParams<{ entryId: string }>();

  const entry = mockEntries.find((item) => item._id === params.entryId) ?? null;

  const handleEditEntry = (entry: DiaryEntry) => {
    console.log("edit entry", entry);
  };

  const handleDeleteEntry = (id: string) => {
    console.log("delete entry", id);
  };

  return (
    <Container>
      <main className={styles.diaryEntryPage}>
        <DiaryEntryDetails
          entry={entry}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
        />
      </main>
    </Container>
  );
}
