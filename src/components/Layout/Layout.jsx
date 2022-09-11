import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';
import Link from 'next/link';

export const Layout = (props) => {
	const router = useRouter();

	const { children, ...customMeta } = props;
	const meta = {
		title: 'Rhys.fyi',
		description: `A site to make recommendations and get reviewed on them`,
		type: 'website',
		...customMeta,
	};

	return (
		<>
			<Head>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>

				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="Chem Eng" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />
			</Head>

			<main className={styles.layoutContainer}>
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
				{children}
			</main>
		</>
	);
};
