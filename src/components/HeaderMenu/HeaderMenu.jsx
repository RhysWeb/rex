import styles from './HeaderMenu.module.css';
import Link from 'next/link';

const HeaderMenu = ({ selected }) => {
	return (
		<div className={styles.container}>
			<Link href="/home">
				<div
					className={
						selected == 'recommendations'
							? `${styles.perspectiveTab} ${styles.selected}`
							: styles.perspectiveTab
					}
				>
					Recommendations
				</div>
			</Link>
			<Link href="/friends">
				<div
					className={
						selected == 'friends'
							? `${styles.perspectiveTab} ${styles.selected}`
							: styles.perspectiveTab
					}
				>
					Friends
				</div>
			</Link>
		</div>
	);
};

export default HeaderMenu;
