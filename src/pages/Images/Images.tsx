import styles from './Images.module.css';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from './components/Pagination/Pagination';
import { Sorting } from './components/Sorting/Sorting';
import { usePhotos } from '../../hooks/usePhotos';
import { PhotoCard } from '../../components/PhotoCard/PhotoCard';
import { useState } from 'react';
import { Image } from './components/Image/Image';

export const Images = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [isOpenPhoto, setIsOpenPhoto] = useState(false);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

	const category = searchParams.get('category') || '';
	const page = parseInt(searchParams.get('page') || '1');
	const sortParamRaw = searchParams.get('sort');
	const sort: 'relevant' | 'latest' = sortParamRaw === 'latest' ? 'latest' : 'relevant';
	const search = searchParams.get('search') || '';

	const { photos, totalPages, isPageOutOfBounds, setIsPageOutOfBounds } = usePhotos(
		category,
		page,
		sort,
		search,
	);

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

	const handleOpenPhoto = (index: number) => {
		setSelectedPhotoIndex(index);
		setIsOpenPhoto(true);
	};
	const handlePrevPhoto = () => {
		setSelectedPhotoIndex((prevIndex) =>
			prevIndex === 0 ? photos.length - 1 : prevIndex - 1,
		);
	};
	const handleNextPhoto = () => {
		setSelectedPhotoIndex((prevIndex) =>
			prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
		);
	};

	if (isPageOutOfBounds) {
		return <p>Страница не существует. Пожалуйста, выберите существующую страницу.</p>;
	}
	return (
		<div className={styles.container}>
			<Sorting onSortChange={handleSortChange} />
			<div className={styles.photosFromCategory}>
				{photos.map((photo, index) => (
					<div
						key={photo.id}
						className={styles.photo}
						onClick={() => handleOpenPhoto(index)}
					>
						<img
							className={styles.image}
							src={photo.urls.small}
							alt={photo.alt_description || 'Unsplash Image'}
						/>
						<PhotoCard photo={photo} />
					</div>
				))}
			</div>
			{isOpenPhoto && (
				<Image
					photo={photos[selectedPhotoIndex]}
					onClose={() => setIsOpenPhoto(false)}
					onPrev={handlePrevPhoto}
					onNext={handleNextPhoto}
				/>
			)}
			<Pagination
				page={page}
				handlePageChange={handlePageChange}
				totalPages={totalPages}
			/>
		</div>
	);
};
