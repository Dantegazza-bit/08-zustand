// app/@modal/(.)notes/[id]/page.tsx
import NotePreview from "@/components/NotePreview/NotePreview";
import Modal from "@/components/Modal/Modal";

interface ModalNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalNotePage({ params }: ModalNotePageProps) {
  const { id } = await params;

  return (
    <Modal onClose={() => {}}>
      <NotePreview id={id} />
    </Modal>
  );
}
