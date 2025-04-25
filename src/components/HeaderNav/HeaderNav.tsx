import { CategoryLogo } from '@assets/icons/CategoryLogo';
import { FavouritesLogo } from '@assets/icons/FavouritesLogo';
import { ImagesLogo } from '@assets/icons/ImagesLogo';
import { LogoModsen } from '@components/LogoModsen/LogoModsen';
import { ROUTES } from '@constants/routes';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import styles from './HeaderNav.module.css';

export const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const isFavouritesPage = location.pathname === ROUTES.FAVOURITES;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className={`${styles.header} ${isMenuOpen ? styles.open : ''}`}>
      <div className={styles.info}>
        <LogoModsen />

        <button
          className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Menu toggle"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.pages} ${isMenuOpen ? styles.show : ''}`}>
          <NavLink
            to={ROUTES.CATEGORIES}
            className={({ isActive }) =>
              `${styles.category} ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            <CategoryLogo />
            Category
          </NavLink>
          <NavLink
            to={ROUTES.IMAGES}
            className={({ isActive }) =>
              `${styles.images} ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            <ImagesLogo />
            Images
          </NavLink>
          <NavLink
            to={ROUTES.FAVOURITES}
            className={({ isActive }) =>
              `${styles.favourites} ${isActive ? styles.active : ''}`
            }
            onClick={closeMenu}
          >
            <FavouritesLogo filled={isFavouritesPage} />
            Favourites
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
