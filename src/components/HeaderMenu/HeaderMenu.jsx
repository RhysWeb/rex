import Image from 'next/image';
import ButtonOne from '../ButtonOne/ButtonOne';
import styles from './HeaderMenu.module.css';
import { signOut } from 'next-auth/react';

const HeaderMenu = ({ session, recsUser }) => {
	return (
		<div className={styles.container}>
			<div className={styles.perspectiveTab}>Recommendations</div>
			<div className={styles.perspectiveTab}>Friends</div>
			<div className={styles.perspectiveTab}>Other</div>
		</div>
	);
};

export default HeaderMenu;
