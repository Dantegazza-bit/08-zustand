// app/notes/filter/[...slug]/page.tsx
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

interface RouteParams {
  slug?: string[];
}

interface FilterPageProps {
  params: Promise<RouteParams>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;

  const rawTag = slug?.[0] ?? "all";
  const tag = rawTag === "all" ? undefined : rawTag;

  const { notes } = await fetchNotes({
    page: 1,
    perPage: 10,
    tag,
  });

  return <NoteList notes={notes} detailsBasePath={`/notes/filter/${rawTag}`} />;
}
