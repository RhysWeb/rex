import styles from './recsHomePage.module.css';
import Head from 'next/head';
import { signOut, useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { NotSignedIn } from '../../components/NotSignedInContent/NotSignedIn';
import { Loading } from '../../components/Loading/Loading';
import Image from 'next/image';
import ButtonOne from '../../components/ButtonOne/ButtonOne';
import { NewRec } from '../../components/NewRec/NewRec';
import { Recommendation } from '../../components/Recommendation/Recommendation';
import CreateUser from '../../components/CreateUser/CreateUser';
import Header from '../../components/Header/Header';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';

const trpcOptions = {
	refetchInterval: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
};

const RecsHomePage = ({}) => {
	const { data: session, status: sessionStatus } = useSession();

	return (
		<>
			<Head>
				<title>Reviews</title>
			</Head>
			{sessionStatus === 'loading' ? (
				<Loading />
			) : session ? (
				<Contents session={session} />
			) : (
				<NotSignedIn />
			)}
		</>
	);
};

const Contents = ({ session }) => {
	// Get the user data (recsUser). Remember that this component only loads once we have a session.
	console.log('calling trpc getUser');
	const {
		data: recsUser,
		isLoading: gettingUser,
		refetch: refetchUser,
	} = trpc.useQuery(
		['reviewsUser.getUser', { userId: session.user.id }],
		trpcOptions
	);
	// Get the users recommendations
	console.log('calling trpc getRecommendations');
	const { data: recommendations, refetch: refetchRecommendations } =
		trpc.useQuery(
			['recommendation.getRecommendations', { authorId: session.user.id }],
			trpcOptions
		);

	if (gettingUser) return <Loading />;
	if (!recsUser)
		return <CreateUser session={session} refetchUser={refetchUser} />;
	if (recsUser)
		return (
			<div className={styles.main}>
				<Header session={session} recsUser={recsUser} />
				<HeaderMenu session={session} recsUser={recsUser} />
				<div className={styles.content}>
					<NewRec
						refetchRecs={refetchRecommendations}
						authorId={session.user.id}
					/>

					{recommendations ? (
						recommendations.recs.map((rec) => (
							<div key={rec.id}>
								<Recommendation
									name={rec.recName}
									detail={rec.recDetail}
									category={rec.reviewCategory}
									id={rec.id}
									refetchRecs={refetchRecommendations}
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

export default RecsHomePage;
