import Head from 'next/head';
import { useData } from '../../utils/DataContext';

export const Layout = (props) => {
	const { flipped, setFlipped } = useData();
	const { children, ...customMeta } = props;
	const meta = {
		title: 'Recs',
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
				<link rel="manifest" href="/site.webmanifest" />

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

			<main color-scheme={flipped ? 'grape' : ''}>{children}</main>
		</>
	);
};
