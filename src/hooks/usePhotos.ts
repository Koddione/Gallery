import { fetchGeneralPhotos, fetchPhotosByCategory } from '@api/unsplash';
import { PHOTOS_PER_PAGE } from '@constants/photosPerPage';
import { UnsplashPhoto } from '@customTypes/unsplashPhoto';
import { useEffect, useState } from 'react';

export const usePhotos = (
  category: string,
  page: number,
  sort: 'relevant' | 'latest',
  search: string,
) => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoading(true);
      if (!category && !search) {
        const validSort = sort === 'latest' ? 'latest' : 'popular';
        const data = await fetchGeneralPhotos(PHOTOS_PER_PAGE, page, validSort);
        setPhotos(data);
        setTotalPages(100);
        setIsLoading(false);
        return;
      }
      const response = await fetchPhotosByCategory(
        category,
        PHOTOS_PER_PAGE,
        page,
        sort,
        search,
      );
      if (page > response.total_pages) {
        setPhotos([]);
        setIsLoading(false);
        return;
      }
      setPhotos(response.results);
      setTotalPages(response.total_pages);
      setIsLoading(false);
    };
    loadPhotos();
  }, [category, page, sort, search]);

  return { photos, totalPages, isLoading };
};
