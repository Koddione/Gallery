import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { HeaderSearch } from './components/HeaderSearch/HeaderSearch';
import styles from './Header.module.css';
import { useHeaderLogic } from '../../hooks/useHeaderLogic';

export const Header = () => {
	const { isFavouritePage, isNotFoundPage } = useHeaderLogic();

	return (
		<header className={styles.header}>
			<HeaderNav />
			{!isFavouritePage && !isNotFoundPage && <HeaderSearch />}
		</header>
	);
};
