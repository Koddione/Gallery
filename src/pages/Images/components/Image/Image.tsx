import { Left } from '../../../../assets/icons/LeftArrow';
import { Right } from '../../../../assets/icons/RightArrow';
import { PhotoCard } from '../../../../components/PhotoCard/PhotoCard';
import { UnsplashPhoto } from '../../../../types/unsplashPhoto';
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
      <div className={styles.shadow}></div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button className={styles.close} onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className={styles.left} onClick={onPrev}>
            <Left />
          </button>
          <div className={styles.photo}>
            <img
              className={styles.photo}
              src={photo.urls.small}
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
