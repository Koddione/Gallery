import { NavLink, useLocation } from 'react-router';
import styles from './HeaderNav.module.css';
import { LogoModsen } from '../../../LogoModsen/LogoModsen';
import { CategoryLogo } from './components/CategoryLogo/CategoryLogo';
import { ImagesLogo } from './components/ImagesLogo/ImagesLogo';
import { FavouritesLogo } from '../../../FavouritesLogo/FavouritesLogo';

export const HeaderNav = () => {
	const location = useLocation();
	const isFavouritesPage = location.pathname === '/favourites';
	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<LogoModsen />

				<nav className={styles.pages}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							`${styles.category} ${isActive ? styles.active : ''}`
						}
					>
						<CategoryLogo />
						Category
					</NavLink>
					<NavLink
						to="/images"
						className={({ isActive }) =>
							`${styles.images} ${isActive ? styles.active : ''}`
						}
					>
						<ImagesLogo />
						Images
					</NavLink>
					<NavLink
						to="/favourites"
						className={({ isActive }) =>
							`${styles.favourites} ${isActive ? styles.active : ''}`
						}
					>
						<FavouritesLogo filled={isFavouritesPage} />
						Favourites
					</NavLink>
				</nav>
			</div>
		</div>
	);
};
