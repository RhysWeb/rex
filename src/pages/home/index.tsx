import type { NextPage } from 'next';
import styles from './reviewsPage.module.css';
import Head from 'next/head';
import { signOut, useSession } from 'next-auth/react';
import ButtonTwo from '../../components/ButtonTwo/ButtonTwo';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import { NotSignedIn } from '../../components/NotSignedInContent/NotSignedIn';
import { Loading } from '../../components/Loading/Loading';
import Image from 'next/image';

type Recommendation = {
	id: number;
	title: string;
	description: string;
	rating: number;
};

type FakeReviewer = {
	id: number;
	name: string;
	rating: number;
};

type FakeFriends = {
	id: number;
	name: string;
	rating: number;
};

const reviewer = [];
const recommendations: Recommendation[] = [
	{
		id: 1,
		title: 'E.T. The Extra-Terrestrial',
		description:
			'A young alien who is accidentally sent thirty years into the past in a search for his missing father.',
		rating: 8.8,
	},
	{
		id: 2,
		title: 'Top Gun',
		description:
			'American Maverick lives in Katoomba, Australia. He has a best friend, a friend who is a pilot, and a friend who is a soldier. He is a good friend, but he is a bad friend.',
		rating: 8.0,
	},
	{
		id: 3,

		title: 'The Godfather',
		description:
			'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
		rating: 9.2,
	},
];

const fakeReviewers: FakeReviewer[] = [
	{
		id: 1,
		name: 'John Doe',
		rating: 8.8,
	},
	{
		id: 2,
		name: 'Jane Doe',
		rating: 8.0,
	},
	{
		id: 3,
		name: 'Jack Doe',
		rating: 9.2,
	},
];

const fakeFriends: FakeFriends[] = [
	{
		id: 1,
		name: 'John Doe',
		rating: 8.8,
	},
	{
		id: 2,
		name: 'Jane Doe',
		rating: 8.0,
	},
	{
		id: 3,
		name: 'Jack Doe',
		rating: 9.2,
	},
];

// @ts-ignore
const Contents = ({ session }) => {
	// session: {user: {
	//     name?: string | null;
	//     email?: string | null;
	//     image?: string | null;
	//     id: string | null;
	//     role?: enum;}

	// {"user":{"id":"cl72e6nh00006ew6jvo8nhujy","role":"USER","name":"RhysB","email":"rhysbalmforth@gmail.com","image":"https://lh3.googleusercontent.com/a-/AFdZucrXxFLUaiVAseXuINpMzZX30gdDSJqOZdW9c6Y86Dc=s96-c"},"expires":"2022-09-21T21:59:56.077Z"}

	const router = useRouter();

	const { data, isLoading } = trpc.useQuery([
		'reviewsUser.getUser',
		// @ts-ignore
		{ userId: session?.user?.id },
	]);
	if (isLoading) return <Loading />;
	if (!data) router.push('/createUser');
	// data:{"id":2,"authUserId":"cl6msy20u00170gmari8z92j8","createdAt":"2022-08-21T13:49:12.661Z","updatedAt":"2022-08-21T13:49:12.662Z","userName":"Bob"}

	// If we have session and the session userid is in our validated users db then the homepage is shown below
	if (data)
		return (
			<div className={styles.main}>
				<div className={styles.topRow}>
					<div className={styles.nameBadge}>
						<div className={styles.name}>{data.userName}</div>
						<div className={styles.imageContainer}>
							<Image
								src={session.user.image}
								alt="bollocks"
								width={1000}
								height={1000}
								className={styles.icon}
								placeholder="blur"
								blurDataURL={session.user.image}
							/>
						</div>
					</div>
					<ButtonTwo
						text="Sign out"
						onClick={() => {
							signOut();
						}}
						margin="3rem 0 0 0"
					/>
				</div>
				<div className={styles.filler}>
					<div>Your recommendations</div>
					<div>
						{recommendations.map((r) => (
							<div key={r.id}>
								<div>{r.title}</div>
								<div>{r.description}</div>
								<div>{r.rating}</div>
							</div>
						))}
					</div>
				</div>
				<div className={styles.filler}>
					<div>Your top reviewers</div>
					<div>
						{fakeReviewers.map((r) => (
							<div key={r.id}>
								<div>{r.name}</div>
								<div>{r.rating}</div>
							</div>
						))}
					</div>
				</div>
				<div className={styles.filler}>
					<div>Your friends leaderboard</div>
					<div>
						{fakeFriends.map((r) => (
							<div key={r.id}>
								<div>{r.name}</div>
								<div>{r.rating}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);

	return <Loading />;
};

const ReviewsCreateUserPage: NextPage = ({}) => {
	const { data: session, status } = useSession();

	return (
		<>
			<Head>
				<title>Reviews</title>
			</Head>
			{status === 'loading' ? (
				<Loading />
			) : session ? (
				<Contents session={session} />
			) : (
				<NotSignedIn />
			)}
		</>
	);
};

export default ReviewsCreateUserPage;
