import { CloseIco } from '@assets/icons/CloseIco';
import { Left } from '@assets/icons/LeftArrow';
import { Right } from '@assets/icons/RightArrow';
import { PhotoCard } from '@components/PhotoCard/PhotoCard';
import { UnsplashPhoto } from '@customTypes/unsplashPhoto';

import styles from './Image.module.css';

interface ImageProps {
  photo: UnsplashPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isFavourite: boolean;
  onFavouriteChange: (isFavourite: boolean) => void;
}

export const Image = ({
  photo,
  onClose,
  onPrev,
  onNext,
  isFavourite,
  onFavouriteChange,
}: ImageProps) => {
  return (
    <>
      <div className={styles.shadow} onClick={onClose}></div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button className={styles.close} onClick={onClose}>
            <CloseIco />
          </button>
          <button className={styles.left} onClick={onPrev}>
            <Left />
          </button>
          <div className={styles.photoWrapper}>
            <img
              className={styles.photo}
              src={photo.urls.regular}
              alt={photo.alt_description || 'Image'}
            />
            <div className={styles.description}>
              <PhotoCard
                photo={photo}
                isFavourite={isFavourite}
                onFavouriteChange={onFavouriteChange}
                isFullView={true}
              />
            </div>
          </div>
          <button className={styles.right} onClick={onNext}>
            <Right />
          </button>
        </div>
      </div>
    </>
  );
};
