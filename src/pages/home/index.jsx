import styles from './recsHomePage.module.css';
import { trpc } from '../../utils/trpc';
import { NewRec } from '../../components/NewRec/NewRec';
import { Recommendation } from '../../components/Recommendation/Recommendation';
import { Loading } from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';

const trpcOptions = {
	refetchInterval: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
};

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		console.log('no session');
		signIn('google', { callbackUrl: '/home' });

		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	} else if (!session.user?.role) {
		console.log('Session but no user role');
		return {
			redirect: {
				destination: '/signup',
				permanent: false,
			},
		};
	} else {
		console.log('session and user role');
		return { props: { data: session } };
	}
}

export default function RecsHomePage({ data: session }) {
	// Get the users recommendations
	console.log('calling trpc getRecommendations');
	const { data: recommendations, refetch: refetchRecommendations } =
		trpc.useQuery(
			['recs.getRecommendations', { authorId: session.user.id }],
			trpcOptions
		);

	return (
		<div className={styles.main}>
			<Header session={session} />
			<HeaderMenu selected="recommendations" />

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
								del={true}
							/>
						</div>
					))
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}
