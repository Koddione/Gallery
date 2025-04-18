import { UnsplashPhoto } from '../../types/unsplashPhoto';
import { truncateText } from '../../utils/truncateText';
import { FavouritesLogo } from '../FavouritesLogo/FavouritesLogo';
import styles from './PhotoCard.module.css';
import { toggleFavourite } from '../../utils/favouritesStorage';

interface PhotoCardProps {
	photo: UnsplashPhoto;
	isFavourite: boolean;
	onFavouriteChange: (isFavourite: boolean) => void;
}

export const PhotoCard = ({ photo, isFavourite, onFavouriteChange }: PhotoCardProps) => {
	const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const newState = toggleFavourite(photo);
		onFavouriteChange(newState);
	};

	return (
		<div className={styles.description}>
			<p>
				{truncateText(photo.name || photo.alt_description || 'Без названия', 30)}
			</p>
			<button
				className={`${styles.save} ${isFavourite ? styles.filled : ''}`}
				onClick={handleSave}
			>
				<FavouritesLogo filled={isFavourite} />
			</button>
		</div>
	);
};
