import { matchPath, useLocation } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { HeaderSearch } from './components/HeaderSearch/HeaderSearch';
import styles from './Header.module.css';

export const Header = () => {
	const location = useLocation();
	const isFavouritePage = location.pathname === '/favourites';

	const isNotFoundPage =
		!matchPath('/', location.pathname) &&
		!matchPath('/images', location.pathname) &&
		!matchPath('/favourites', location.pathname);

	return (
		<header className={styles.header}>
			<HeaderNav />
			{!isFavouritePage && !isNotFoundPage && <HeaderSearch />}
		</header>
	);
};
