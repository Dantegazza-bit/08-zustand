// app/notes/@modal/(.)[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NoteDetails from "../../[id]/NoteDetails.client";

interface ModalNotePageProps {
  params: { id: string };
}

export default function ModalNotePage({ params }: ModalNotePageProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NoteDetails id={params.id} />
    </Modal>
  );
}
