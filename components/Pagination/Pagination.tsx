// components/Pagination/Pagination.tsx
"use client";

import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (nextPage: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      {pages.map((p) => (
        <li
          key={p}
          className={p === page ? css.active : undefined}
          onClick={() => onChange(p)}
        >
          <a>{p}</a>
        </li>
      ))}
    </ul>
  );
}
