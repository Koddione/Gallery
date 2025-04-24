import { HeaderNav } from '@components/HeaderNav/HeaderNav';
import { HeaderSearch } from '@components/HeaderSearch/HeaderSearch';
import { useHeaderLogic } from '@hooks/useHeaderLogic';

import styles from './Header.module.css';

export const Header = () => {
  const { isFavouritePage, isNotFoundPage } = useHeaderLogic();

  return (
    <header className={styles.header}>
      <HeaderNav />
      {!isFavouritePage && !isNotFoundPage && <HeaderSearch />}
    </header>
  );
};
