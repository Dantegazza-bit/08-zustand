// app/notes/filter/[...slug]/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface RouteParams {
  slug?: string[];
}

interface FilterPageProps {
  params: Promise<RouteParams>;
}

async function getDehydratedState(tag: string | undefined) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 10,
        search: "",
        tag,
      }),
  });

  return dehydrate(queryClient);
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;

  const rawTag = slug?.[0] ?? "all";
  const normalizedTag = rawTag === "all" ? undefined : rawTag;

  const state = await getDehydratedState(normalizedTag);

  return (
    <HydrationBoundary state={state}>
      {/* обов’язковий проп tag */}
      <NotesClient tag={rawTag} />
    </HydrationBoundary>
  );
}
