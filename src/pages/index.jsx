import styles from './index.module.css';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Sansita_Swashed } from '@next/font/google';

const sansita = Sansita_Swashed({ subsets: ['latin'] });

export default function NotSignedIn() {
	const { data: session } = useSession();
	const router = useRouter();

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
			<div className={styles.titleParent}>
				<h1 className={`${styles.title} ${sansita.className}`}>Recs</h1>
			</div>

			<h2 className={styles.subHeading}>
				A site for friends to give and receive recommendations
			</h2>
			<p className={styles.note}>...and rate each other on their choices</p>

			<button
				onClick={() => {
					if (session) {
						router.push('/recs');
					} else {
						signIn('google', { callbackUrl: '/recs' });
						console.log('fired');
					}
				}}
				className={styles.newButton}
			>
				Sign in with Google
			</button>

			<p className={styles.note}>It&apos;s free</p>
		</div>
	);
}
