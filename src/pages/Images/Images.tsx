import styles from './Images.module.css';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from './components/Pagination/Pagination';
import { Sorting } from './components/Sorting/Sorting';
import { usePhotos } from '../../hooks/usePhotos';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { Image } from './components/Image/Image';
import { usePhotoViewer } from '../../hooks/usePhotoViewer';
import { useState } from 'react';
import { UnsplashPhoto } from '../../types/unsplashPhoto';

export const Images = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [favouriteIds, setFavouriteIds] = useState<string[]>(() => {
		const stored = JSON.parse(sessionStorage.getItem('favourites') || '[]');
		return stored.map((p: UnsplashPhoto) => p.id);
	});

	const category = searchParams.get('category') || '';
	const page = parseInt(searchParams.get('page') || '1');
	const sortParamRaw = searchParams.get('sort');
	const sort: 'relevant' | 'latest' = sortParamRaw === 'latest' ? 'latest' : 'relevant';
	const search = searchParams.get('search') || '';

	const { photos, totalPages, isPageOutOfBounds, setIsPageOutOfBounds, isLoading } =
		usePhotos(category, page, sort, search);

	const { isOpen, selectedPhoto, openPhoto, closePhoto, showPrev, showNext } =
		usePhotoViewer(photos);

	const handleSortChange = (newSort: string) => {
		setSearchParams({ category, page: '1', sort: newSort });
	};

	const handlePageChange = (newPage: number) => {
		if (newPage <= totalPages && newPage >= 1) {
			setSearchParams({ category, page: newPage.toString() });
		} else {
			setIsPageOutOfBounds(true);
		}
	};

	const handleFavouriteChange = (photoId: string, isFavourite: boolean) => {
		setFavouriteIds((prev) =>
			isFavourite ? [...prev, photoId] : prev.filter((id) => id !== photoId),
		);
	};

	return (
		<div className={styles.container}>
			{photos.length !== 0 && <Sorting onSortChange={handleSortChange} />}
			<div className={styles.photosFromCategory}>
				{isLoading ? (
					<div className={styles.spinnerWrapper}>
						<div className={styles.spinner}></div>
						<p className={styles.loading}>Uploading images...</p>
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
							onClick={() => openPhoto(index)}
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
					handlePageChange={handlePageChange}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};
