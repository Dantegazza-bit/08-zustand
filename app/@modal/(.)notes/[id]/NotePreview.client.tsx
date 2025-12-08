// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return <p className={css.state}>Loading...</p>;
  }

  if (isError || !note) {
    return <p className={css.state}>Failed to load note.</p>;
  }

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>{note.title}</h2>

        <button type="button" className={css.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>

      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{note.createdAt}</p>
    </div>
  );
}
