import Image from 'next/image';
import ButtonOne from '../ButtonOne/ButtonOne';
import styles from './Header.module.css';
import { signOut } from 'next-auth/react';
import Logo from '../Logo/Logo';
import { useState } from 'react';

const Header = ({ session, flip, toggleFlip }) => {
	const [showLogout, setShowLogout] = useState(false);
	return (
		<div className={styles.hero}>
			<div className={styles.nameBadge}>
				{showLogout && (
					<input
						type="button"
						value="sign-out"
						onClick={() => {
							signOut();
						}}
						className={styles.signOutButton}
					/>
				)}
				<div className={styles.imageContainer}>
					<Image
						src={session.user.image}
						alt="user Image"
						width={1000}
						height={1000}
						placeholder="blur"
						blurDataURL={session.user.image}
						onClick={() => {
							console.log(showLogout);
							setShowLogout(!showLogout);
						}}
					/>
				</div>
				<div className={styles.flex}>
					<div className={styles.name}>{session.user.name}</div>
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
