export interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string | undefined;
    small: string;
  };
  alt_description: string;
  name: string | null;
}
