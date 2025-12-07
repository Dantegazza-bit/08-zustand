// app/@modal/(.)notes/[id]/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";

interface ModalNotePageProps {
  params: Promise<{ id: string }>;
}

async function getDehydratedState(id: string) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return dehydrate(queryClient);
}

export default async function ModalNotePage({ params }: ModalNotePageProps) {
  const { id } = await params;
  const state = await getDehydratedState(id);

  return (
    <HydrationBoundary state={state}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
