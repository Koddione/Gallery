import searchIco from '@assets/icons/seatchIco.png';
import { ROUTES } from '@constants/routes';
import { SEARCH_PARAMS } from '@constants/searchParams';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';

import styles from './HeaderSearch.module.css';

export const HeaderSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const showInput = location.pathname === ROUTES.IMAGES;

  const [inputValue, setInputValue] = useState(
    searchParams.get(SEARCH_PARAMS.SEARCH) || '',
  );
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(searchParams.get(SEARCH_PARAMS.SEARCH) || '');
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(SEARCH_PARAMS.SEARCH, value);
        newParams.set(SEARCH_PARAMS.PAGE, '1');
        return newParams;
      });
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Let`s Find Some <span>Images</span> Here!
      </h1>

      {showInput && (
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
            placeholder="Search images..."
            className={styles.input}
          />
          <img src={searchIco} alt="search" className={styles.searchIco} />
        </div>
      )}
    </div>
  );
};
