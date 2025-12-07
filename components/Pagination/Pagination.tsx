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

  const handlePrev = () => {
    if (page > 1) {
      onChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onChange(page + 1);
    }
  };

  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={css.button}
        onClick={handlePrev}
        disabled={page === 1}
      >
        {"<"}
      </button>

      <span className={css.page}>{page}</span>

      <button
        type="button"
        className={css.button}
        onClick={handleNext}
        disabled={page === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
