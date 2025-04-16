import axios from 'axios';

export const unsplashApi = axios.create({
	baseURL: 'https://api.unsplash.com',
	headers: {
		Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
	},
});
export const fetchPhotosByCategory = async (category: string, perPage = 10) => {
	const response = await unsplashApi.get('/search/photos', {
		params: {
			query: category,
			per_page: perPage,
		},
	});

	return response.data.results;
};
