import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const useHeaderLogic = () => {
	const location = useLocation();

	const isFavouritePage = useMemo(
		() => location.pathname === '/favourites',
		[location.pathname],
	);
	const isNotFoundPage = useMemo(() => {
		const excludedPaths = ['/', '/images', '/favourites'];
		return !excludedPaths.includes(location.pathname);
	}, [location.pathname]);

	return { isFavouritePage, isNotFoundPage };
};
