// app/@modal/(.)notes/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal"; // шлях підкоригуй під свій компонент
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

export default function ModalNotePage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NoteDetailsClient />
    </Modal>
  );
}
