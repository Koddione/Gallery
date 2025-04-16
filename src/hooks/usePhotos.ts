import { useEffect, useState } from 'react';
import { fetchPhotosByCategory } from '../api/unsplash';

interface UnsplashPhoto {
	id: string;
	urls: {
		small: string;
	};
	alt_description: string;
	name: string | null;
}

export const usePhotos = (
	category: string,
	page: number,
	sort: 'relevant' | 'latest',
	search: string,
) => {
	const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [isPageOutOfBounds, setIsPageOutOfBounds] = useState(false);

	useEffect(() => {
		if (!category) return;
		const loadPhotos = async () => {
			const perPage = 12;
			const response = await fetchPhotosByCategory(
				category,
				perPage,
				page,
				sort,
				search,
			);
			if (page > response.total_pages) {
				setIsPageOutOfBounds(true);
				return;
			}
			setPhotos(response.results);
			setTotalPages(response.total_pages);
			setIsPageOutOfBounds(false);
		};
		loadPhotos();
	}, [category, page, sort, search]);

	return { photos, totalPages, isPageOutOfBounds, setIsPageOutOfBounds };
};
