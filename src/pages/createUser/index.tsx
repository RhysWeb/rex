import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from './reviewsCreateUserPage.module.css';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import ButtonOne from '../../components/ButtonOne/ButtonOne';
import ButtonTwo from '../../components/ButtonTwo/ButtonTwo';
import { trpc } from '../../utils/trpc';

// @ts-ignore
const Contents = ({ session }) => {
	const mutation = trpc.useMutation('reviewsUser.createUser');
	const createAccount = (userName: string, id: string | null | undefined) => {
		if (typeof id !== 'string') return;
		mutation.mutate({ authUserId: id, userName });
	};

	const [userName, setUserName] = useState('');
	const { data, refetch, isLoading } = trpc.useQuery([
		'reviewsUser.getUser',
		{ userId: session?.user?.id },
	]);

	if (!session)
		return (
			<div className={`${styles.flexCenter} ${styles.topGap}`}>
				<h1>Create User</h1>
				<p>Please sign in using google</p>
				<ButtonOne
					margin="3rem 0 0 0"
					text="Sign in with Google"
					onClick={() => {
						signIn('google');
					}}
				/>
			</div>
		);
	if (isLoading)
		return (
			<div className={`${styles.flexCenter} ${styles.topGap}`}>
				<h1>Create User</h1>
				<p>Loading...</p>
			</div>
		);

	// if (status === 'loading') return <div>Loading...</div>;
	if (!data)
		return (
			<div className={`${styles.flexCenter} ${styles.topGap}`}>
				<h1>Create User</h1>
				<p>
					You are signed in with google. Next, create a username for your
					reviews and click create reviews account.
				</p>

				<label>
					Username:{' '}
					<input
						value={userName}
						type="text"
						onChange={(e) => {
							setUserName(e.target.value);
						}}
					></input>
				</label>
				{mutation.error && (
					<p>Something went wrong! {mutation.error.message}</p>
				)}
				<ButtonOne
					text="Create account"
					disabled={mutation.isLoading}
					onClick={() => {
						createAccount(userName, session.user?.id);
					}}
					margin="3rem 0 0 0"
				/>

				<ButtonTwo
					text="Sign out of Google"
					onClick={() => {
						signOut();
					}}
					margin="3rem 0 0 0"
				/>
			</div>

			// <div>
			// 	<div className={styles.main}>
			// 		<h1 className={styles.title}>Hello {session.user?.name}</h1>
			// 		<Image
			// 			src={session.user?.image!}
			// 			alt="User image"
			// 			width="100px"
			// 			height="100px"
			// 			className={styles.userLogo}
			// 		/>

			// 		<ButtonOne
			// 			text="Sign out"
			// 			onClick={() => {
			// 				signOut();
			// 			}}
			// 			margin="3rem 0 0 0"
			// 		/>
			// 	</div>
			// </div>
		);

	return (
		<div className={`${styles.flexCenter} ${styles.topGap}`}>
			<h1>Create User</h1>
			<p>
				You are signed in with google and you already have a REVIEWS account.
			</p>

			<p>data: {JSON.stringify(data)}</p>

			<ButtonTwo
				text="Sign out of Google"
				onClick={() => {
					signOut();
				}}
				margin="3rem 0 0 0"
			/>
		</div>
	);
};

const ReviewsCreateUserPage: NextPage = ({}) => {
	const { data: session, status } = useSession();
	if (status === 'loading')
		return (
			<>
				<Head>
					<title>Chem Eng Home</title>
				</Head>
				<div>Loading...</div>
			</>
		);

	return (
		<>
			<Head>
				<title>Chem Eng Home</title>
			</Head>

			<Contents session={session} />
		</>
	);
};

export default ReviewsCreateUserPage;
