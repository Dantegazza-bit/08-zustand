// components/LayoutNotes/LayoutNotes.tsx
import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function LayoutNotes({ children, sidebar }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      {sidebar && <aside className={css.sidebar}>{sidebar}</aside>}

      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
