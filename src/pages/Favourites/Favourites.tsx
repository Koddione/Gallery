import { useEffect, useState } from 'react';
import { UnsplashPhoto } from '../../types/unsplashPhoto';
import styles from './Favourites.module.css';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { usePhotoViewer } from '../../hooks/usePhotoViewer';
import { Image } from '../Images/components/Image/Image';

export const Favourites = () => {
	const [favourites, setFavourites] = useState<UnsplashPhoto[]>([]);

	useEffect(() => {
		const favs = JSON.parse(sessionStorage.getItem('favourites') || '[]');
		setFavourites(favs);
	}, []);

	const handleFavouriteChange = (photoId: string, isFavourite: boolean) => {
		if (isFavourite) return;

		const updated = favourites.filter((fav) => fav.id !== photoId);
		setFavourites(updated);
		sessionStorage.setItem('favourites', JSON.stringify(updated));
	};

	const { isOpen, selectedPhoto, openPhoto, closePhoto, showPrev, showNext } =
		usePhotoViewer(favourites);

	const selectedPhotoIsFavourite = selectedPhoto
		? favourites.some((fav) => fav.id === selectedPhoto.id)
		: false;

	return (
		<div className={styles.container}>
			{favourites.length !== 0 && (
				<h2>
					<span>Saved by you</span>
					<br />
					Your favorites list
				</h2>
			)}
			{favourites.length === 0 ? (
				<p className="notFound">
					Your <span> Favourites </span>List <br /> Is Empty
				</p>
			) : (
				<div className={styles.gallery}>
					{favourites.map((photo) => (
						<div
							key={photo.id}
							className={styles.photo}
							onClick={() => openPhoto(favourites.indexOf(photo))}
						>
							<img
								className={styles.image}
								src={photo.urls.small}
								alt={photo.alt_description || 'Photo'}
							/>
							<PhotoCard
								photo={photo}
								isFavourite={true}
								onFavouriteChange={(isFav) =>
									handleFavouriteChange(photo.id, isFav)
								}
							/>
						</div>
					))}
				</div>
			)}
			{isOpen && selectedPhoto && (
				<Image
					photo={selectedPhoto}
					isFavourite={selectedPhotoIsFavourite}
					onFavouriteChange={(isFav) =>
						handleFavouriteChange(selectedPhoto.id, isFav)
					}
					onClose={closePhoto}
					onPrev={showPrev}
					onNext={showNext}
				/>
			)}
		</div>
	);
};
