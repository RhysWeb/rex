import styles from './HeaderMenu.module.css';
import Link from 'next/link';

const HeaderMenu = ({ selected }) => {
	return (
		<div className={styles.container}>
			<Link
				href="/home"
				className={
					selected == 'recommendations'
						? `${styles.perspectiveTab} ${styles.selected}`
						: styles.perspectiveTab
				}
			>
				Recommendations
			</Link>
			<Link
				href="/friends"
				className={
					selected == 'friends'
						? `${styles.perspectiveTab} ${styles.selected}`
						: styles.perspectiveTab
				}
			>
				Friends
			</Link>
		</div>
	);
};

export default HeaderMenu;
