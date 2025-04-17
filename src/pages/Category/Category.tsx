import styles from './Category.module.css';
import { useEffect, useState } from 'react';
import { categories } from '../../constants/categories';
import { fetchPhotosByCategory } from '../../api/unsplash';
import { useNavigate } from 'react-router-dom';

type CategoryPreview = {
	category: string;
	imageUrl: string;
};

export const Category = () => {
	const [categoryPreviews, setCategoryPreviews] = useState<CategoryPreview[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadPreviews = async () => {
			const previews = await Promise.all(
				categories.map(async (category) => {
					try {
						const photos = await fetchPhotosByCategory(category, 1);
						return {
							category,
							imageUrl: photos.results[0]?.urls?.small || '',
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
			setIsLoading(false);
		};

		loadPreviews();
	}, []);

	const handleClick = (category: string) => {
		navigate(`/images?category=${category}&page=1`);
	};

	return (
		<>
			<div className={styles.container}>
				{isLoading ? (
					<div className={styles.spinnerWrapper}>
						<div className={styles.spinner}></div>
						<p className={styles.loading}>Uploading images...</p>
					</div>
				) : (
					categoryPreviews.map(({ category, imageUrl }) => (
						<div
							className={styles.category}
							key={category}
							onClick={() => handleClick(category)}
						>
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
					))
				)}
			</div>
		</>
	);
};
