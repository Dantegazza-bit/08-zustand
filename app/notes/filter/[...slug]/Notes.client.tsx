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

interface NotesClientProps {
  tag: string; // 'all' | 'work' | 'personal' | ...
}

const PER_PAGE = 10;

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // --- debounce пошуку ---
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(id);
  }, [search]);

  const normalizedTag = tag === "all" ? undefined : tag;

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", { page, search: debouncedSearch, tag: normalizedTag }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag: normalizedTag,
      }),
    keepPreviousData: true,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  // --- обробники ---

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleCreateOpen = () => setIsCreateOpen(true);
  const handleCreateClose = () => setIsCreateOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load notes</p>;

  return (
    <>
      {/* Пошук */}
      <SearchBox value={search} onChange={handleSearchChange} />

      {/* Список нотаток */}
      <NoteList
        notes={notes}
        detailsBasePath={`/notes/filter/${tag}`}
        onCreateClick={handleCreateOpen}
      />

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
