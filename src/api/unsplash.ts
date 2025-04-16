import axios from 'axios';

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
	const query = search ? `${category} ${search}` : category;
	const response = await unsplashApi.get('/search/photos', {
		params: {
			query,
			per_page: perPage,
			page,
			order_by: orderBy,
		},
	});

	return response.data;
};
