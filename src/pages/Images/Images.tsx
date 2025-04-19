import styles from './Images.module.css';

import { Pagination } from './components/Pagination/Pagination';
import { Sorting } from './components/Sorting/Sorting';
import { usePhotos } from '../../hooks/usePhotos';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { Image } from './components/Image/Image';
import { usePhotoViewer } from '../../hooks/usePhotoViewer';
import { useSearchParamsHandler } from '../../hooks/useSearchParamsHandler';
import { useFavourites } from '../../hooks/useFavourites';

export const Images = () => {
	const { category, page, sort, search, handleSortChange, handlePageChange } =
		useSearchParamsHandler();
	const { favouriteIds, handleFavouriteChange } = useFavourites();
	const { photos, totalPages, isLoading } = usePhotos(category, page, sort, search);
	const { isOpen, selectedPhoto, openPhoto, closePhoto, showPrev, showNext } =
		usePhotoViewer(photos);

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
						The search didn't yield any results, please try <span>Again</span>
						.
					</p>
				) : (
					photos.map((photo, index) => (
						<div
							key={photo.id}
							className={styles.photo}
							onClick={(e) => {
								if ((e.target as HTMLElement).closest('button')) return;
								openPhoto(index);
							}}
						>
							<img
								className={styles.image}
								src={photo.urls.small}
								alt={photo.alt_description || 'Unsplash Image'}
							/>
							<PhotoCard
								photo={photo}
								isFavourite={favouriteIds.includes(photo.id)}
								onFavouriteChange={(isFav) =>
									handleFavouriteChange(photo.id, isFav)
								}
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
					onFavouriteChange={(isFav) =>
						handleFavouriteChange(selectedPhoto.id, isFav)
					}
				/>
			)}
			{photos.length !== 0 && (
				<Pagination
					page={page}
					handlePageChange={(newPage) => handlePageChange(newPage, totalPages)}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};
