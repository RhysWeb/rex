import styles from './recsHomePage.module.css';
import { trpc } from '../utils/trpc';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Recommendations from '../components/Recomendations/Recommendations';
import Hell from '../components/Hell/Hell';
import Header from '../components/Header/Header';
import HeaderMenuTwo from '../components/HeaderMenuTwo/HeaderMenuTwo';

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

export default function RecsHelloPage({ data: session }) {
	const [flip, setFlip] = useState(false);
	const toggleFlip = () => {
		setFlip(!flip);
	};

	console.log('calling trpc getRecommendations');
	const { data: recommendations, refetch: refetchRecommendations } =
		trpc.useQuery(
			['recs.getRecommendations', { authorId: session.user.id }],
			trpcOptions
		);

	return (
		<div className={styles.flipContainer}>
			<Header session={session} flip={flip} toggleFlip={toggleFlip} />
			<HeaderMenuTwo selected="recommendations" flip={flip} />
			{/* <button onClick={toggleFlip}>Upside-Down</button> */}
			<div
				className={`${styles.cardFlipper} ${flip ? styles.performFlip : ''}`}
			>
				<div className={styles.cardFrontFace}>
					<Recommendations
						recs={recommendations}
						refetch={refetchRecommendations}
						session={session}
					/>
				</div>

				<div className={styles.cardBackFace}>
					<Hell
						recs={recommendations}
						refetch={refetchRecommendations}
						session={session}
					/>
				</div>
			</div>
		</div>
	);
}
