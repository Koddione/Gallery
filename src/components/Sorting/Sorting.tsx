import { BottomArrow } from '@assets/icons/BottomArrow';
import { useState } from 'react';

import styles from './Sorting.module.css';

interface SortingProps {
  onSortChange: (sort: string) => void;
}

export const Sorting = ({ onSortChange }: SortingProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className={styles.sorting}>
      <p>Sort by</p>
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          onClick={handleClick}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option value="relevant">Relevant</option>
          <option value="latest">Latest</option>
        </select>
        <BottomArrow className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`} />
      </div>
    </div>
  );
};
