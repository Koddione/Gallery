import axios from 'axios';
import { UnsplashPhoto } from '../types/unsplashPhoto';
import { UNSPLASH_ENDPOINTS } from '../constants/apiEndpoints';

export const unsplashApi = axios.create({
	baseURL: 'https://api.unsplash.com',
	headers: {
		Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
	},
});

export const fetchPhotosByCategory = async (
	category: string,
	perPage = 12,
	page = 1,
	orderBy: 'relevant' | 'latest' = 'relevant',
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
	perPage = 12,
	page = 1,
	orderBy: 'latest' | 'oldest' | 'popular' = 'latest',
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
