import { useLocation, useSearchParams } from 'react-router';
import styles from './HeaderSearch.module.css';
import searchIco from '../../../../assets/seatchIco.png';
import { useEffect, useRef, useState } from 'react';

export const HeaderSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const showInput = location.pathname === '/images';

	const [inputValue, setInputValue] = useState(searchParams.get('search') || '');
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setInputValue(searchParams.get('search') || '');
	}, [searchParams]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);

		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		debounceTimeout.current = setTimeout(() => {
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set('search', value);
				newParams.set('page', '1');
				return newParams;
			});
		}, 500);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>
				Let`s Find Some <span>Images</span> Here!
			</h1>

			{showInput && (
				<div className={styles.inputWrapper}>
					<input
						type="text"
						value={inputValue}
						onChange={handleSearchChange}
						placeholder="Search images..."
						className={styles.input}
					/>
					<img src={searchIco} alt="поиск" className={styles.searchIco} />
				</div>
			)}
		</div>
	);
};
