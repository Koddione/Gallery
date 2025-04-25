import { STORAGE_KEY } from '@constants/storageKey';
import { UnsplashPhoto } from '@customTypes/unsplashPhoto';
import { useState } from 'react';

export const useFavourites = () => {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(() => {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    return stored.map((p: UnsplashPhoto) => p.id);
  });

  const handleFavouriteChange = (photoId: string, isFavourite: boolean) => {
    setFavouriteIds((prev) =>
      isFavourite ? [...prev, photoId] : prev.filter((id) => id !== photoId),
    );
  };

  return { favouriteIds, handleFavouriteChange };
};
