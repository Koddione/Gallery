import { Left } from '@assets/icons/LeftArrow';
import { Right } from '@assets/icons/RightArrow';
import { useEffect, useState } from 'react';

import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  handlePageChange,
  totalPages,
}) => {
  const [pageRange, setPageRange] = useState<number[]>([]);
  const pagesToShow = 4;

  useEffect(() => {
    const startPage = Math.floor((page - 1) / pagesToShow) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    setPageRange(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    );
  }, [page, totalPages]);

  const goToPage = (newPage: number) => {
    handlePageChange(newPage);
  };

  const handleNextRange = () => {
    const nextStart = pageRange[pageRange.length - 1] + 1;
    if (nextStart <= totalPages) {
      setPageRange(Array.from({ length: pagesToShow }, (_, i) => nextStart + i));
    }
  };

  const handlePrevRange = () => {
    const prevStart = pageRange[0] - pagesToShow;
    if (prevStart >= 1) {
      setPageRange(Array.from({ length: pagesToShow }, (_, i) => prevStart + i));
    }
  };

  const getPageClickHandler = (pageNumber: number) => () => {
    goToPage(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      {pageRange[0] > 1 && (
        <button className={styles.left} onClick={handlePrevRange}>
          <Left />
        </button>
      )}
      <div className={styles.pages}>
        {pageRange.map((p) => (
          <button
            key={p}
            onClick={getPageClickHandler(p)}
            className={`${styles.pageButton} ${p === page ? styles.active : ''}`}
          >
            {p}
          </button>
        ))}
      </div>
      {pageRange[pageRange.length - 1] < totalPages && (
        <button className={styles.right} onClick={handleNextRange}>
          <Right />
        </button>
      )}
    </div>
  );
};
