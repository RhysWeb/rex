import Image from 'next/image';
import ButtonOne from '../ButtonOne/ButtonOne';
import styles from './Header.module.css';
import { signOut } from 'next-auth/react';

const Header = ({ session }) => {
	return (
		<div className={styles.hero}>
			<div className={styles.nameBadge}>
				<div className={styles.imageContainer}>
					<Image
						src={session.user.image}
						alt="user Image"
						width={1000}
						height={1000}
						placeholder="blur"
						blurDataURL={session.user.image}
					/>
				</div>
				<div className={styles.flex}>
					<div className={styles.name}>{session.user.name}</div>

					<input
						type="button"
						value="sign-out"
						onClick={() => {
							signOut();
						}}
						className={styles.signOutButton}
					/>
				</div>
			</div>
			<div className={styles.logOutButtonContainer}>
				<div className={styles.circle}></div>
				<h1 className={styles.title}>Recs</h1>
			</div>
		</div>
	);
};

export default Header;
