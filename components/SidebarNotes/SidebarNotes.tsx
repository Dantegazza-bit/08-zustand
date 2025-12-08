// components/SidebarNotes/SidebarNotes.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import css from "./SidebarNotes.module.css";

const FILTERS = [
  { label: "All notes", tag: "all" },
  { label: "Work", tag: "Work" },
  { label: "Personal", tag: "Personal" },
  { label: "Shopping", tag: "Shopping" },
  { label: "Todo", tag: "Todo" },
  { label: "Meeting", tag: "Meeting" },
];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {FILTERS.map(({ label, tag }) => {
          const href = `/notes/filter/${tag}`;
          const isActive = pathname === href;

          return (
            <li key={tag} className={css.menuItem}>
              <Link
                href={href}
                className={
                  isActive
                    ? `${css.menuLink} ${css.menuLinkActive}`
                    : css.menuLink
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
