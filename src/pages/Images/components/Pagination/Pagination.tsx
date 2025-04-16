import { Left } from '../left';
import { Right } from '../right';
import styles from './Pagination.module.css';

interface PaginationProps {
	page: number;
	handlePageChange: (page: number) => void;
	totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
	page,
	handlePageChange,
	totalPages,
}) => {
	return (
		<div className={styles.pagination}>
			<button
				className={styles.left}
				onClick={() => handlePageChange(page - 1)}
				disabled={page <= 1}
			>
				<Left />
			</button>
			<span className={styles.pages}>{page}</span>
			<button
				className={styles.right}
				onClick={() => handlePageChange(page + 1)}
				disabled={page >= totalPages}
			>
				<Right />
			</button>
		</div>
	);
};
