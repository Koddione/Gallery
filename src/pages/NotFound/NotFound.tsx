import styles from './NotFound.module.css';

export const NotFound = () => {
	return (
		<div className={styles.container}>
			<p className={styles.error}>
				<span> 404</span> <br />
				NOT FOUND
			</p>
			<p className="notFound">
				The page was <span> not found </span>, please return to the main page.
			</p>
		</div>
	);
};
