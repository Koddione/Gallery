import { useLocation } from 'react-router';
import styles from './HeaderSearch.module.css';
import searchIco from '../../../../assets/seatchIco.png';
export const HeaderSearch = () => {
	const location = useLocation();

	const showInput = location.pathname === '/images';

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>
				Let`s Find Some <span>Images</span> Here!
			</h1>

			{showInput && (
				<div className={styles.inputWrapper}>
					<input
						type="text"
						placeholder="Search images..."
						className={styles.input}
					/>
					<img src={searchIco} alt="поиск" className={styles.searchIco} />
				</div>
			)}
		</div>
	);
};
