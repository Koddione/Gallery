import { Image } from '@components/Image/Image';
import { PhotoCard } from '@components/PhotoCard/PhotoCard';
import { UnsplashPhoto } from '@customTypes/unsplashPhoto';
import { usePhotoViewer } from '@hooks/usePhotoViewer';
import { getFavourites, saveFavourites } from '@utils/favouritesStorage';
import { useEffect, useState } from 'react';

import styles from './Favourites.module.css';

export const Favourites = () => {
  const [favourites, setFavourites] = useState<UnsplashPhoto[]>([]);

  useEffect(() => {
    setFavourites(getFavourites());
  }, []);

  const handleFavouriteChange = (photoId: string, isFavourite: boolean) => {
    if (isFavourite) return;

    const updated = favourites.filter((fav) => fav.id !== photoId);
    setFavourites(updated);
    saveFavourites(updated);
  };

  const { isOpen, selectedPhoto, openPhoto, closePhoto, showPrev, showNext } =
    usePhotoViewer(favourites);

  const selectedPhotoIsFavourite = selectedPhoto
    ? favourites.some((fav) => fav.id === selectedPhoto.id)
    : false;

  const isEmpty = favourites.length === 0;

  const getPhotoClickHandler = (index: number) => () => {
    openPhoto(index);
  };

  const getFavouriteChangeHandler = (photoId: string) => (isFav: boolean) => {
    handleFavouriteChange(photoId, isFav);
  };

  const getSelectedFavouriteChangeHandler = () => (isFav: boolean) =>
    selectedPhoto && handleFavouriteChange(selectedPhoto.id, isFav);

  return (
    <div className={styles.container}>
      {!isEmpty && (
        <h2>
          <span>Saved by you</span>
          <br />
          Your favorites list
        </h2>
      )}
      {isEmpty ? (
        <p className="notFound">
          Your <span> Favourites </span>List <br /> Is Empty
        </p>
      ) : (
        <div className={styles.gallery}>
          {favourites.map((photo) => (
            <div
              key={photo.id}
              className={styles.photo}
              onClick={getPhotoClickHandler(favourites.indexOf(photo))}
            >
              <img
                className={styles.image}
                src={photo.urls.small}
                alt={photo.alt_description || 'Photo'}
              />
              <PhotoCard
                photo={photo}
                isFavourite={true}
                onFavouriteChange={getFavouriteChangeHandler(photo.id)}
              />
            </div>
          ))}
        </div>
      )}
      {isOpen && selectedPhoto && (
        <Image
          photo={selectedPhoto}
          isFavourite={selectedPhotoIsFavourite}
          onFavouriteChange={getSelectedFavouriteChangeHandler()}
          onClose={closePhoto}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  );
};
