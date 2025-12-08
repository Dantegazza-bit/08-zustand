// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreview id={id} />
    </Modal>
  );
}
