// app/notes/filter/[...slug]/Notes.client.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

const PER_PAGE = 10;

interface NotesClientProps {
  tag: string; // обов'язковий проп
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const normalizedTag = tag === "all" ? undefined : tag;

  // --- debounce пошуку ---
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1); // при новому пошуку — на першу сторінку
    }, 300);

    return () => window.clearTimeout(id);
  }, [search]);

  // --- React Query ---
  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", { page, search: debouncedSearch, tag: normalizedTag }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag: normalizedTag,
      }),
    refetchOnMount: false, // щоб зайвий раз не перезавантажувати
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  // --- обробники ---
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleCreateOpen = () => setIsCreateOpen(true);
  const handleCreateClose = () => setIsCreateOpen(false);

  // --- стани завантаження/помилки ---
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  // --- рендер ---
  return (
    <>
      {/* Пошук */}
      <SearchBox value={search} onChange={handleSearchChange} />

      {/* Кнопка створення нотатки */}
      <button type="button" onClick={handleCreateOpen}>
        Create note +
      </button>

      {/* Список нотаток */}
      <NoteList notes={notes} detailsBasePath={`/notes/filter/${tag}`} />

      {/* Пагінація */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />

      {/* Модалка створення */}
      {isCreateOpen && (
        <Modal onClose={handleCreateClose}>
          <NoteForm onClose={handleCreateClose} />
        </Modal>
      )}
    </>
  );
}
