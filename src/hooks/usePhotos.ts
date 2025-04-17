import { useEffect, useState } from 'react';
import { fetchGeneralPhotos, fetchPhotosByCategory } from '../api/unsplash';
import { UnsplashPhoto } from '../types/unsplashPhoto';

export const usePhotos = (
	category: string,
	page: number,
	sort: 'relevant' | 'latest',
	search: string,
) => {
	const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [isPageOutOfBounds, setIsPageOutOfBounds] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadPhotos = async () => {
			setIsLoading(true);
			const perPage = 12;
			if (!category && !search) {
				const validSort = sort === 'latest' ? 'latest' : 'popular';
				const data = await fetchGeneralPhotos(perPage, page, validSort);
				setPhotos(data);
				setTotalPages(100);
				setIsPageOutOfBounds(false);
				setIsLoading(false);
				return;
			}
			const response = await fetchPhotosByCategory(
				category,
				perPage,
				page,
				sort,
				search,
			);
			if (page > response.total_pages) {
				setIsPageOutOfBounds(true);
				setIsLoading(false);
				return;
			}
			setPhotos(response.results);
			setTotalPages(response.total_pages);
			setIsPageOutOfBounds(false);
			setIsLoading(false);
		};
		loadPhotos();
	}, [category, page, sort, search]);

	return { photos, totalPages, isPageOutOfBounds, setIsPageOutOfBounds, isLoading };
};
