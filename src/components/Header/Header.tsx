import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { HeaderSearch } from './components/HeaderSearch/HeaderSearch';
import styles from './Header.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<HeaderNav />
			<HeaderSearch />
		</header>
	);
};
