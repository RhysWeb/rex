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
import { useForm, useWatch } from 'react-hook-form';
import ButtonOne from '../../components/ButtonOne/ButtonOne';
import { useState } from 'react';
import { NewRecForm } from '../../components/NewRecForm/NewRecForm';
import { Recommendation } from '../../components/Recommendation/Recommendation';

const trpcOptions = {
	refetchInterval: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
};

// @ts-ignore
const Contents = ({ session }) => {
	// Get the user data (recsUser)
	const { data: recsUser, isLoading } = trpc.useQuery(
		['reviewsUser.getUser', { userId: session.user.id }],
		// @ts-ignore
		trpcOptions
	);
	// Get the users recommendations
	const { data: recommendations, refetch } = trpc.useQuery(
		['recommendation.getRecommendations', { authorId: session.user.id }],
		// @ts-ignore
		trpcOptions
	);

	//State for toggling the 'new recommendation' view
	const [viewNewRec, setNewRec] = useState(false);
	function toggleNewComment() {
		setNewRec(!viewNewRec);
	}
	const router = useRouter();

	if (isLoading) return <Loading />;
	if (!recsUser) router.push('/createUser');
	if (recsUser)
		return (
			<div className={styles.main}>
				<div className={styles.hero}>
					<div className={styles.nameBadge}>
						<div className={styles.imageContainer}>
							<Image
								src={session.user.image}
								alt="user Image"
								width={1000}
								height={1000}
								className={styles.icon}
								placeholder="blur"
								blurDataURL={session.user.image}
							/>
						</div>
						<div className={styles.name}>{recsUser.userName}</div>
					</div>
					<ButtonOne
						text="Sign out"
						onClick={() => {
							signOut();
						}}
						margin="3rem 0 0 0"
						disabled={false}
					/>
				</div>

				<div className={styles.content}>
					<div className={styles.button}>
						<ButtonOne
							text="Add rec"
							onClick={toggleNewComment}
							margin="1rem 0 2rem 0"
							disabled={false}
						/>
					</div>
					{viewNewRec && (
						<div className={styles.recDiv}>
							<NewRecForm
								refetch={refetch}
								setNewRec={setNewRec}
								authorId={session.user.id}
							/>
						</div>
					)}

					{recommendations ? (
						recommendations.recs.map((rec) => (
							<div key={rec.id} className={styles.recDiv}>
								<Recommendation
									name={rec.recName}
									detail={rec.recDetail}
									category={rec.reviewCategory}
								/>
							</div>
						))
					) : (
						<Loading />
					)}
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
