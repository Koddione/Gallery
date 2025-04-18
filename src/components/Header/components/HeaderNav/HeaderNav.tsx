import { NavLink, useLocation } from 'react-router';
import styles from './HeaderNav.module.css';
import { LogoModsen } from '../../../LogoModsen/LogoModsen';
import { CategoryLogo } from './components/CategoryLogo/CategoryLogo';
import { ImagesLogo } from './components/ImagesLogo/ImagesLogo';
import { FavouritesLogo } from '../../../FavouritesLogo/FavouritesLogo';
import { ROUTES } from '../../../../constants/routes';

export const HeaderNav = () => {
	const location = useLocation();
	const isFavouritesPage = location.pathname === ROUTES.FAVOURITES;
	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<LogoModsen />

				<nav className={styles.pages}>
					<NavLink
						to={ROUTES.CATEGORIES}
						className={({ isActive }) =>
							`${styles.category} ${isActive ? styles.active : ''}`
						}
					>
						<CategoryLogo />
						Category
					</NavLink>
					<NavLink
						to={ROUTES.IMAGES}
						className={({ isActive }) =>
							`${styles.images} ${isActive ? styles.active : ''}`
						}
					>
						<ImagesLogo />
						Images
					</NavLink>
					<NavLink
						to={ROUTES.FAVOURITES}
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
