import type { NextPage } from 'next';
import styles from './reviewsHomePage.module.css';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import ButtonOne from '../../components/ButtonOne/ButtonOne';
// import { useRouter } from 'next/router';
import Image from 'next/image';

const Contents = () => {
	const { data: session } = useSession();

	// const { push, asPath } = useRouter();

	// const handleSignOut = async () => {
	// 	const data = await signOut({ redirect: false, callbackUrl: '/' });

	// 	push(data.url);
	// };
	// const handleSignIn = () => push(`/auth/signIn?callbackUrl=${asPath}`);

	if (!session)
		return (
			<div className={`${styles.flexCenter} ${styles.topGap}`}>
				<h1>Recommendations and Reviews</h1>
				<ButtonOne
					margin="3rem 0 0 0"
					text="Sign in"
					onClick={() => {
						signIn();
					}}
				/>
			</div>
		);

	// if (status === 'loading') return <div>Loading...</div>;

	return (
		<div>
			<div className={styles.main}>
				<h1 className={styles.title}>Hello {session.user?.name}</h1>

				<Image
					src={session.user?.image ? session.user.image : '/friends.png'}
					alt="User image"
					width="100px"
					height="100px"
					className={styles.userLogo}
				/>

				<ButtonOne
					text="Sign out"
					onClick={() => {
						signOut();
					}}
					margin="3rem 0 0 0"
				/>
			</div>
		</div>
	);
};

const ReviewsHomePage: NextPage = ({}) => {
	return (
		<>
			<Head>
				<title>Chem Eng Home</title>
			</Head>

			<Contents />
		</>
	);
};

export default ReviewsHomePage;
