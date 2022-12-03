import styles from './HeaderMenuTwo.module.css';
import Link from 'next/link';

const HeaderMenu = ({ selected, flip }) => {
	return (
		<div className={styles.container}>
			<div className={flip === true ? styles.hidden : styles.unhidden}>
				<Link
					href="/home"
					className={
						selected === 'recommendations'
							? `${styles.menuTab} ${styles.selected}`
							: styles.perspectiveTab
					}
				>
					Recommendations
				</Link>
				<Link
					href="/friends"
					className={
						selected === 'friends'
							? `${styles.menuTab} ${styles.selected}`
							: styles.perspectiveTab
					}
				>
					Friends
				</Link>
			</div>
			<div className={flip === false ? styles.hidden : styles.unhidden}>
				<Link
					href="/home"
					className={
						selected === 'hates'
							? `${styles.menuTab} ${styles.selected}`
							: styles.perspectiveTab
					}
				>
					Hates
				</Link>
				<Link
					href="/enemies"
					className={
						selected === 'enemies'
							? `${styles.menuTab} ${styles.selected}`
							: styles.perspectiveTab
					}
				>
					Enemies
				</Link>
			</div>
		</div>
	);
};

export default HeaderMenu;
