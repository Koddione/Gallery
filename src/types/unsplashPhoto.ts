export interface UnsplashPhoto {
	id: string;
	urls: {
		small: string;
	};
	alt_description: string;
	name: string | null;
}
