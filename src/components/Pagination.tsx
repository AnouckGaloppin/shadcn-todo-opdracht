import React from "react";
import { useEffect } from "react";

type PropType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PropType> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(1);
    }
  }, [totalPages, currentPage, onPageChange]);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= maxVisiblePages) {
      pages.push(...Array.from({ length: maxVisiblePages }, (_, i) => i + 1));
      pages.push("...", totalPages);
    } else if (currentPage >= totalPages - maxVisiblePages + 1) {
      pages.push(1, "...");
      pages.push(
        ...Array.from(
          { length: maxVisiblePages },
          (_, i) => totalPages - maxVisiblePages + i + 1,
        ),
      );
    } else {
      pages.push(1, "...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...", totalPages);
    }
    return pages;
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`rounded border px-3 py-1 transition-all ${
              currentPage === page
                ? "bg-blue-500 font-bold text-white shadow-md"
                : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="rounded border px-3 py-1 transition-all hover:bg-gray-200"
          >
            {page}
          </span>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
