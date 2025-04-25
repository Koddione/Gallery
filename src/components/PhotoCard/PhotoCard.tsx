import { FavouritesLogo } from '@assets/icons/FavouritesLogo';
import { TEXT_LIMIT } from '@constants/textLimits';
import { UnsplashPhoto } from '@customTypes/unsplashPhoto';
import { toggleFavourite } from '@utils/favouritesStorage';
import { truncateText } from '@utils/truncateText';

import styles from './PhotoCard.module.css';

interface PhotoCardProps {
  photo: UnsplashPhoto;
  isFavourite: boolean;
  onFavouriteChange: (isFavourite: boolean) => void;
  isFullView?: boolean;
}

export const PhotoCard = ({
  photo,
  isFavourite,
  onFavouriteChange,
  isFullView = false,
}: PhotoCardProps) => {
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newState = toggleFavourite(photo);
    onFavouriteChange(newState);
  };
  const name = photo.name || photo.alt_description || 'No name';
  const displayText = isFullView
    ? truncateText(name, TEXT_LIMIT.fullView)
    : truncateText(name, TEXT_LIMIT.default);

  return (
    <div className={`${styles.description} ${isFullView ? styles.full : ''}`}>
      <p>{displayText}</p>
      <button
        className={`${styles.save} ${isFavourite ? styles.filled : ''}`}
        onPointerDown={handleSave}
      >
        <FavouritesLogo filled={isFavourite} />
      </button>
    </div>
  );
};
