import { UnsplashPhoto } from '../../types/unsplashPhoto';
import { truncateText } from '../../utils/truncateText';
import { FavouritesLogo } from '../FavouritesLogo/FavouritesLogo';
import styles from './PhotoCard.module.css';

interface PhotoCardProps {
	photo: UnsplashPhoto;
}

export const PhotoCard = ({ photo }: PhotoCardProps) => {
	return (
		<div className={styles.description}>
			<p>
				{truncateText(photo.name || photo.alt_description || 'Без названия', 30)}
			</p>
			<button className={styles.save}>
				<FavouritesLogo />
			</button>
		</div>
	);
};
