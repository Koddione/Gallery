import { fetchPhotosByCategory } from '@api/unsplash';
import { categories } from '@constants/categories';
import { ROUTES } from '@constants/routes';
import { SEARCH_PARAMS } from '@constants/searchParams';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Category.module.css';

type CategoryPreview = {
  category: string;
  imageUrl: string;
  error?: string;
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
          } catch (_error) {
            return {
              category,
              imageUrl: '',
              error: `Error loading the preview for "${category}"`,
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
    navigate(`${ROUTES.IMAGES}?category=${category}&${SEARCH_PARAMS.PAGE}=1`);
  };

  const getCategoryClickHandler = (category: string) => () => {
    handleClick(category);
  };

  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <div className="spinnerWrapper">
            <div className="spinner"></div>
            <p className="loading">Uploading images...</p>
          </div>
        ) : (
          categoryPreviews.map(({ category, imageUrl, error }) => (
            <div
              className={styles.category}
              key={category}
              onClick={getCategoryClickHandler(category)}
            >
              {imageUrl ? (
                <img src={imageUrl} alt={category} className={styles.imageCategory} />
              ) : (
                <div className={styles.placeholder}>{error || 'No image'}</div>
              )}
              <div className={styles.textCategory}>{category}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
