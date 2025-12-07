// app/notes/filter/[...slug]/Notes.client.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { Note } from "@/types/note";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  tag: string; // обов'язковий проп
}

const PER_PAGE = 10;

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const normalizedTag = tag === "all" ? undefined : tag;

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", { page, search, tag: normalizedTag }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag: normalizedTag,
      }),
    // без keepPreviousData, бо в нашій версії @tanstack/react-query воно не типізоване
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // при новому пошуку повертаємось на першу сторінку
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleCreateClick = () => {
    setIsCreateOpen(true);
  };

  const handleCreateClose = () => {
    setIsCreateOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load notes</p>;

  return (
    <>
      {/* Верхня панель: пошук + кнопка створення */}
      <div className="notes-toolbar">
        <SearchBox value={search} onChange={handleSearchChange} />
        <button type="button" onClick={handleCreateClick}>
          Create note +
        </button>
      </div>

      {/* Список нотаток */}
      <NoteList notes={notes} detailsBasePath={`/notes/filter/${tag}`} />

      {/* Пагінація */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Модалка створення */}
      {isCreateOpen && (
        <Modal onClose={handleCreateClose}>
          {/* У стартовому коді GoIT зазвичай у NoteForm є проп onClose */}
          <NoteForm onClose={handleCreateClose} />
        </Modal>
      )}
    </>
  );
}
