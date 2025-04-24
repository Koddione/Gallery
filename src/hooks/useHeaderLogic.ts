import { ROUTES } from '@constants/routes';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useHeaderLogic = () => {
  const location = useLocation();

  const isFavouritePage = useMemo(
    () => location.pathname === ROUTES.FAVOURITES,
    [location.pathname],
  );
  const isNotFoundPage = useMemo(() => {
    const excludedPaths = [ROUTES.CATEGORIES, ROUTES.IMAGES, ROUTES.FAVOURITES];
    return !excludedPaths.includes(location.pathname);
  }, [location.pathname]);

  return { isFavouritePage, isNotFoundPage };
};
