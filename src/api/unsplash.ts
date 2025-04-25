import { UNSPLASH_BASE_URL, UNSPLASH_ENDPOINTS } from '@constants/apiEndpoints';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@constants/pagination';
import {
  CategorySortOption,
  GeneralSortOption,
  SORT_OPTIONS,
} from '@constants/sortOptions';
import { UnsplashPhoto } from '@customTypes/unsplashPhoto';
import axios from 'axios';

export const unsplashApi = axios.create({
  baseURL: UNSPLASH_BASE_URL,
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
  },
});

export const fetchPhotosByCategory = async (
  category: string,
  perPage = DEFAULT_PER_PAGE,
  page = DEFAULT_PAGE,
  orderBy: CategorySortOption = SORT_OPTIONS.DEFAULT,
  search: string = '',
) => {
  const query = [category, search].filter(Boolean).join(' ');
  const response = await unsplashApi.get(UNSPLASH_ENDPOINTS.searchPhotos, {
    params: {
      query,
      per_page: perPage,
      page,
      order_by: orderBy,
    },
  });

  return response.data;
};

export const fetchGeneralPhotos = async (
  perPage = DEFAULT_PER_PAGE,
  page = DEFAULT_PAGE,
  orderBy: GeneralSortOption = SORT_OPTIONS.LATEST,
): Promise<UnsplashPhoto[]> => {
  const response = await unsplashApi.get(UNSPLASH_ENDPOINTS.photos, {
    params: {
      per_page: perPage,
      page,
      order_by: orderBy,
    },
  });
  return response.data;
};
