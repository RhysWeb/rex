import ButtonOne from '../ButtonOne/ButtonOne';
import styles from './NotSignedIn.module.css';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export const NotSignedIn = () => {
	return (
		<div className={styles.main}>
			<Image
				className={styles.image}
				// src="https://res.cloudinary.com/dffmzkbrq/image/upload/v1661123619/friends4_s7qcaz.jpg"
				src="/friends4.jpg"
				alt="A group of young white friends laughing and looking pleased with themselves"
				layout="fill"
				objectFit="cover"
				objectPosition="center"
				priority
				placeholder="blur"
				blurDataURL="/friends4.jpg"
			/>

			<h1 className={styles.title}>Recs</h1>

			<h2 className={styles.subHeading}>
				A site for friends to give and receive recommendations
			</h2>
			<p className={styles.note}>...and rate each other on their choices</p>

			<ButtonOne
				margin="7rem 0 0 0"
				text="Sign in with Google"
				onClick={() => {
					signIn('google');
				}}
				disabled={false}
			/>

			<p className={styles.itsFree}>It&apos;s free</p>
		</div>
	);
};
