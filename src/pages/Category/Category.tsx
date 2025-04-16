import styles from './Category.module.css';
import { useEffect, useState } from 'react';
import { categories } from '../../constants/categories';
import { fetchPhotosByCategory } from '../../api/unsplash';

type CategoryPreview = {
	category: string;
	imageUrl: string;
};

export const Category = () => {
	const [categoryPreviews, setCategoryPreviews] = useState<CategoryPreview[]>([]);
	useEffect(() => {
		const loadPreviews = async () => {
			const previews = await Promise.all(
				categories.map(async (category) => {
					try {
						const photos = await fetchPhotosByCategory(category, 1);
						return {
							category,
							imageUrl: photos[0]?.urls?.small || '',
						};
					} catch (error) {
						console.error(`Ошибка загрузки превью для "${category}":`, error);
						return {
							category,
							imageUrl: '',
						};
					}
				}),
			);
			setCategoryPreviews(previews);
		};

		loadPreviews();
	}, []);

	return (
		<>
			<div className={styles.container}>
				{categoryPreviews.map(({ category, imageUrl }) => (
					<div className={styles.category} key={category}>
						{imageUrl ? (
							<img
								src={imageUrl}
								alt={category}
								className={styles.imageCategory}
							/>
						) : (
							<div>Нет фото</div>
						)}
						<div className={styles.textCategory}>{category}</div>
					</div>
				))}
			</div>
		</>
	);
};
