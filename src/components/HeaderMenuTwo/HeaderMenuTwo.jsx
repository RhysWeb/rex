import styles from './HeaderMenuTwo.module.css';
import Link from 'next/link';

const HeaderMenuTwo = ({ selected, flip }) => {
	return (
		<div className={styles.container}>
			<div className={flip === true ? styles.hidden : styles.unhidden}>
				<Link
					href="/recs"
					className={
						selected === 'recommendations'
							? `${styles.menuTab} ${styles.selected}`
							: `${styles.menuTab} ${styles.unselected}`
					}
				>
					Recommendations
				</Link>
				<Link
					href="/friends"
					className={
						selected === 'Frenemies'
							? `${styles.menuTab} ${styles.selected}`
							: `${styles.menuTab} ${styles.unselected}`
					}
				>
					Friends
				</Link>
			</div>
			<div className={flip === false ? styles.hidden : styles.unhidden}>
				<Link
					href="/recs"
					className={
						selected === 'recommendations'
							? `${styles.menuTab} ${styles.selected}`
							: `${styles.menuTab} ${styles.unselected}`
					}
				>
					Hates
				</Link>
				<Link
					href="/friends"
					className={
						selected === 'Frenemies'
							? `${styles.menuTab} ${styles.selected}`
							: `${styles.menuTab} ${styles.unselected}`
					}
				>
					Enemies
				</Link>
			</div>
		</div>
	);
};

export default HeaderMenuTwo;
