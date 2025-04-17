import { useLocation } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { HeaderSearch } from './components/HeaderSearch/HeaderSearch';
import styles from './Header.module.css';

export const Header = () => {
	const location = useLocation();
	const isFavouritePage = location.pathname === '/favourites';

	return (
		<header className={styles.header}>
			<HeaderNav />
			{!isFavouritePage && <HeaderSearch />}
		</header>
	);
};
