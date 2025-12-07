// app/notes/[id]/NoteDetails.client.tsx
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "../../NoteDetails.module.css";

// ✅ ДОДАЛИ інтерфейс пропів
interface NoteDetailsProps {
  id?: string; // може бути, а може й ні
}

// Назва функції не критична, головне — default export з пропами
export default function NoteDetailsClient({ id }: NoteDetailsProps) {
  // Якщо id прийшов пропом — беремо його,
  // якщо ні — беремо з URL через useParams()
  const params = useParams();
  const routeRawId = params?.id;

  const rawId = id ?? routeRawId;
  const finalId = Array.isArray(rawId) ? rawId[0] : rawId;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", finalId],
    queryFn: () => fetchNoteById(finalId as string),
    enabled: typeof finalId === "string",
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
