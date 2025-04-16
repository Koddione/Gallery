import { useState } from 'react';
import styles from './Sorting.module.css';

interface SortingProps {
	onSortChange: (sort: string) => void;
}

export const Sorting = ({ onSortChange }: SortingProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	const handleBlur = () => {
		setTimeout(() => setIsOpen(false), 100);
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSortChange(e.target.value);
	};

	return (
		<div className={styles.sorting}>
			<p>Sort by</p>
			<div className={styles.selectWrapper}>
				<select
					className={styles.select}
					onClick={handleClick}
					onBlur={handleBlur}
					onChange={handleChange}
				>
					<option value="relevant">Relevant</option>
					<option value="latest">Latest</option>
				</select>
				<svg
					className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
					width="20"
					height="11"
					viewBox="0 0 21 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0 1.96844L2.06036 0L10.5 8.06312L18.9396 0L21 1.96844L10.5 12L0 1.96844Z"
						fill="currentColor"
					/>
				</svg>
			</div>
		</div>
	);
};
