import { useEffect, useState } from 'react';
import { UnsplashPhoto } from '../../types/unsplashPhoto';
import { truncateText } from '../../utils/truncateText';
import { FavouritesLogo } from '../FavouritesLogo/FavouritesLogo';
import styles from './PhotoCard.module.css';

interface PhotoCardProps {
	photo: UnsplashPhoto;
	isFavourite: boolean;
	onFavouriteChange: (isFavourite: boolean) => void;
}

export const PhotoCard = ({ photo, isFavourite, onFavouriteChange }: PhotoCardProps) => {
	const [localFavourite, setLocalFavourite] = useState(isFavourite);

	useEffect(() => {
		setLocalFavourite(isFavourite);
	}, [isFavourite]);

	const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const favourites = JSON.parse(sessionStorage.getItem('favourites') || '[]');
		const isAlreadySaved = favourites.some(
			(fav: UnsplashPhoto) => fav.id === photo.id,
		);

		let updatedFavourites;
		if (isAlreadySaved) {
			updatedFavourites = favourites.filter(
				(fav: UnsplashPhoto) => fav.id !== photo.id,
			);
		} else {
			updatedFavourites = [...favourites, photo];
		}

		sessionStorage.setItem('favourites', JSON.stringify(updatedFavourites));
		const newState = !isAlreadySaved;
		setLocalFavourite(newState);
		onFavouriteChange(newState);
	};

	return (
		<div className={styles.description}>
			<p>
				{truncateText(photo.name || photo.alt_description || 'Без названия', 30)}
			</p>
			<button
				className={`${styles.save} ${localFavourite ? styles.filled : ''}`}
				onClick={handleSave}
			>
				<FavouritesLogo filled={localFavourite} />
			</button>
		</div>
	);
};
