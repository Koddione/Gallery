import styles from './Images.module.css';
import { useSearchParams } from 'react-router-dom';
import { FavouritesLogo } from '../../components/FavouritesLogo/FavouritesLogo';
import { truncateText } from '../../utils/truncateText';

import { Pagination } from './components/Pagination/Pagination';
import { Sorting } from './components/Sorting/Sorting';
import { usePhotos } from '../../hooks/usePhotos';

export const Images = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const category = searchParams.get('category') || '';
	const page = parseInt(searchParams.get('page') || '1');
	const sortParamRaw = searchParams.get('sort');
	const sort: 'relevant' | 'latest' = sortParamRaw === 'latest' ? 'latest' : 'relevant';
	const search = searchParams.get('search') || '';

	const handleSortChange = (newSort: string) => {
		setSearchParams({ category, page: '1', sort: newSort });
	};

	const { photos, totalPages, isPageOutOfBounds, setIsPageOutOfBounds } = usePhotos(
		category,
		page,
		sort,
		search,
	);

	const handlePageChange = (newPage: number) => {
		if (newPage <= totalPages && newPage >= 1) {
			setSearchParams({ category, page: newPage.toString() });
		} else {
			setIsPageOutOfBounds(true);
		}
	};

	if (!category) {
		return <p>Выберите категорию для отображения фотографий.</p>;
	}
	if (isPageOutOfBounds) {
		return <p>Страница не существует. Пожалуйста, выберите существующую страницу.</p>;
	}
	return (
		<div className={styles.container}>
			<Sorting onSortChange={handleSortChange} />
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
