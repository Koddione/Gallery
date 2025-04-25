import { Image } from '@components/Image/Image';
import { Pagination } from '@components/Pagination/Pagination';
import { PhotoCard } from '@components/PhotoCard/PhotoCard';
import { Sorting } from '@components/Sorting/Sorting';
import { useFavourites } from '@hooks/useFavourites';
import { usePhotos } from '@hooks/usePhotos';
import { usePhotoViewer } from '@hooks/usePhotoViewer';
import { useSearchParamsHandler } from '@hooks/useSearchParamsHandler';

import styles from './Images.module.css';

export const Images = () => {
  const { category, page, sort, search, handleSortChange, handlePageChange } =
    useSearchParamsHandler();
  const { favouriteIds, handleFavouriteChange } = useFavourites();
  const { photos, totalPages, isLoading } = usePhotos(category, page, sort, search);
  const { isOpen, selectedPhoto, openPhoto, closePhoto, showPrev, showNext } =
    usePhotoViewer(photos);

  const getPhotoClickHandler = (index: number) => (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    openPhoto(index);
  };

  const getFavouriteChangeHandler = (photoId: string) => (isFav: boolean) => {
    handleFavouriteChange(photoId, isFav);
  };

  const getSelectedFavouriteChangeHandler = () => (isFav: boolean) =>
    selectedPhoto && handleFavouriteChange(selectedPhoto.id, isFav);

  const getPageChangeHandler = (totalPages: number) => (newPage: number) => {
    handlePageChange(newPage, totalPages);
  };

  return (
    <div className={styles.container}>
      {photos.length !== 0 && <Sorting onSortChange={handleSortChange} />}
      <div className={styles.photosFromCategory}>
        {isLoading ? (
          <div className="spinnerWrapper">
            <div className="spinner"></div>
            <p className="loading">Uploading images...</p>
          </div>
        ) : photos.length === 0 ? (
          <p className="notFound">
            The search didn't yield any results, please try <span>Again</span>.
          </p>
        ) : (
          photos.map((photo, index) => (
            <div
              key={photo.id}
              className={styles.photo}
              onClick={getPhotoClickHandler(index)}
            >
              <img
                className={styles.image}
                src={photo.urls.small}
                alt={photo.alt_description || 'Unsplash Image'}
              />
              <PhotoCard
                photo={photo}
                isFavourite={favouriteIds.includes(photo.id)}
                onFavouriteChange={getFavouriteChangeHandler(photo.id)}
              />
            </div>
          ))
        )}
      </div>
      {isOpen && selectedPhoto && (
        <Image
          photo={selectedPhoto}
          onClose={closePhoto}
          onPrev={showPrev}
          onNext={showNext}
          isFavourite={favouriteIds.includes(selectedPhoto.id)}
          onFavouriteChange={getSelectedFavouriteChangeHandler()}
        />
      )}
      {photos.length !== 0 && (
        <Pagination
          page={page}
          handlePageChange={getPageChangeHandler(totalPages)}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
