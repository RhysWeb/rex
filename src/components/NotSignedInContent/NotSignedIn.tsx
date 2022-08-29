import ButtonOne from '../ButtonOne/ButtonOne';
import styles from './NotSignedIn.module.css';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {}

export const NotSignedIn: React.FC<Props> = ({}) => {
	const router = useRouter();
	return (
		<div className={styles.main}>
			<div className={styles.navBar}>
				<Link href="/">
					<svg
						id="eNQkOpUfiPb1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 300 300"
						shapeRendering="geometricPrecision"
						textRendering="geometricPrecision"
						width="60"
						height="60"
					>
						<path
							className={styles.navIcon}
							d="M90.6348,227.32436v-109.68409h-.00001L150,72.67565l59.36522,44.96462h-.00001v109.68409h-118.73041Z"
							transform="translate(-.000005-.000005)"
							strokeWidth="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Link>

				<svg
					onClick={() => router.back()}
					id="esDROrgipPd1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 300 300"
					shapeRendering="geometricPrecision"
					textRendering="geometricPrecision"
					width="60"
					height="60"
				>
					<path
						className={styles.navIcon}
						d="M228.46787,112.26489v68.18182h-88.55386l.11671,31.77013L25.34925,146.56601L139.54527,80.07436l.11826,32.19054l88.80434-.00001Z"
						transform="translate(17.633229 3.8544)"
						strokeWidth="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
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
			<h1 className={styles.title}>TV Rex</h1>
			<h2 className={styles.subHeading}>
				A site for friends to give and receive film and television
				recommendations
			</h2>
			<p className={styles.note}>...and rate each other on their choices</p>

			<ButtonOne
				margin="7rem 0 0 0"
				text="Sign in with Google"
				onClick={() => {
					signIn('google');
				}}
			/>

			<p className={styles.itsFree}>It&apos;s free</p>
		</div>
	);
};
