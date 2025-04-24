import { STORAGE_KEY } from '@constants/storageKey';
import { UnsplashPhoto } from '@customTypes/unsplashPhoto';

export const getFavourites = (): UnsplashPhoto[] => {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
};

export const saveFavourites = (items: UnsplashPhoto[]) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const toggleFavourite = (photo: UnsplashPhoto): boolean => {
  const favourites = getFavourites();
  const isAlreadySaved = favourites.some((fav) => fav.id === photo.id);
  const updated = isAlreadySaved
    ? favourites.filter((fav) => fav.id !== photo.id)
    : [...favourites, photo];

  saveFavourites(updated);
  return !isAlreadySaved;
};
