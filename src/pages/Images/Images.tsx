import styles from './Images.module.css';
import { useEffect, useState } from 'react';
import { fetchPhotosByCategory } from '../../api/unsplash';
import { useSearchParams } from 'react-router-dom';
import { FavouritesLogo } from '../../components/FavouritesLogo/FavouritesLogo';
import { truncateText } from '../../utils/truncateText';
import { Right } from './components/right';
import { Left } from './components/left';
import { Pagination } from './components/Pagination/Pagination';

interface UnsplashPhoto {
	id: string;
	urls: {
		small: string;
	};
	alt_description: string;
	name: string | null;
}

export const Images = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get('category') || '';
	const page = parseInt(searchParams.get('page') || '1');
	const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		if (!category) return;
		const loadPhotos = async () => {
			const perPage = 12;
			const response = await fetchPhotosByCategory(category, perPage, page);
			setPhotos(response.results);
			setTotalPages(response.total_pages);
		};
		loadPhotos();
	}, [category, page]);

	const handlePageChange = (newPage: number) => {
		setSearchParams({ category, page: newPage.toString() });
	};

	if (!category) {
		return <p>Выберите категорию для отображения фотографий.</p>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.photosFromCategory}>
				{photos.map((photo) => (
					<div key={photo.id} className={styles.photo}>
						<img
							className={styles.image}
							src={photo.urls.small}
							alt={photo.alt_description || 'Unsplash Image'}
						/>
						<div className={styles.description}>
							<p>
								{truncateText(
									photo.name || photo.alt_description || 'Без названия',
									30,
								)}
							</p>
							<button className={styles.save}>
								<FavouritesLogo />
							</button>
						</div>
					</div>
				))}
			</div>

			<Pagination
				page={page}
				handlePageChange={handlePageChange}
				totalPages={totalPages}
			/>
		</div>
	);
};
