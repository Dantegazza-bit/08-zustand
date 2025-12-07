// components/LayoutNotes/LayoutNotes.tsx
import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: ReactNode;
  sidebar?: ReactNode; // сайдбар може бути або ні
  // ⚠️ НІЯКОГО modal тут не потрібно
}

export default function LayoutNotes({ children, sidebar }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}
