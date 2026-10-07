'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function BlogPagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedPage, setSelectedPage] = useState(currentPage);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  if (totalPages <= 1) {
    return null;
  }

  const setCurrentPage = (nextPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(nextPage));
    setSelectedPage(nextPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-10 flex justify-center items-center gap-1 sm:gap-2 flex-wrap" aria-label="Paginación del blog">
      <button
        type="button"
        onClick={() => setCurrentPage(Math.max(1, selectedPage - 1))}
        disabled={selectedPage === 1}
        aria-label="Página anterior"
        className="px-2 sm:px-3 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-dark hover:bg-gray-300 text-sm sm:text-base"
      >
        <span className="hidden sm:inline">← Anterior</span>
        <span className="sm:hidden">←</span>
      </button>

      {(() => {
        const pages = [];

        if (totalPages <= 5) {
          for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
            pages.push(
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                aria-label={`Ir a la página ${pageNumber}`}
                aria-current={selectedPage === pageNumber ? 'page' : undefined}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                  selectedPage === pageNumber
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-dark hover:bg-gray-300'
                }`}
              >
                {pageNumber}
              </button>,
            );
          }
        } else {
          pages.push(
            <button
              key={1}
              type="button"
              onClick={() => setCurrentPage(1)}
              aria-label="Ir a la página 1"
              aria-current={selectedPage === 1 ? 'page' : undefined}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                selectedPage === 1
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 text-dark hover:bg-gray-300'
              }`}
            >
              1
            </button>,
          );

          let middlePages;
          if (selectedPage <= 3) {
            middlePages = [2, 3, 4];
          } else if (selectedPage >= totalPages - 2) {
            middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
          } else {
            middlePages = [selectedPage - 1, selectedPage, selectedPage + 1];
          }

          if (middlePages[0] > 2) {
            pages.push(<span key="ellipsis-start" className="px-1 sm:px-2 text-sm sm:text-base">...</span>);
          }

          middlePages.forEach((pageNumber) => {
            pages.push(
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                aria-label={`Ir a la página ${pageNumber}`}
                aria-current={selectedPage === pageNumber ? 'page' : undefined}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                  selectedPage === pageNumber
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-dark hover:bg-gray-300'
                }`}
              >
                {pageNumber}
              </button>,
            );
          });

          if (middlePages[middlePages.length - 1] < totalPages - 1) {
            pages.push(<span key="ellipsis-end" className="px-1 sm:px-2 text-sm sm:text-base">...</span>);
          }

          pages.push(
            <button
              key={totalPages}
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              aria-label={`Ir a la página ${totalPages}`}
              aria-current={selectedPage === totalPages ? 'page' : undefined}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                selectedPage === totalPages
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 text-dark hover:bg-gray-300'
              }`}
            >
              {totalPages}
            </button>,
          );
        }

        return pages;
      })()}

      <button
        type="button"
        onClick={() => setCurrentPage(Math.min(totalPages, selectedPage + 1))}
        disabled={selectedPage === totalPages}
        aria-label="Página siguiente"
        className="px-2 sm:px-3 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-dark hover:bg-gray-300 text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Siguiente →</span>
        <span className="sm:hidden">→</span>
      </button>
    </div>
  );
}
