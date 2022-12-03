import Image from 'next/image';
import ButtonOne from '../ButtonOne/ButtonOne';
import styles from './Header.module.css';
import { signOut } from 'next-auth/react';
import { Sansita_Swashed } from '@next/font/google';
import Logo from '../Logo/Logo';

const sansita = Sansita_Swashed({ subsets: ['latin'] });

const Header = ({ session, flip, toggleFlip }) => {
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
			<Logo flip={flip} toggleFlip={toggleFlip} />
			{/* <div
				className={!flip ? styles.titleContainer : styles.flip}
				onClick={toggleFlip}
			>
				<div className={`${styles.title} ${sansita.className}`}>Recs</div>
			</div> */}
		</div>
	);
};

export default Header;
