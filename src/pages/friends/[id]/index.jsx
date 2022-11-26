import { useRouter } from 'next/router';
import styles from './Friend.module.css';
import { trpc } from '../../../utils/trpc';
import { Loading } from '../../../components/Loading/Loading';
import { NewRec } from '../../../components/NewRec/NewRec';
import { Recommendation } from '../../../components/Recommendation/Recommendation';
import Header from '../../../components/Header/Header';
import HeaderMenu from '../../../components/HeaderMenu/HeaderMenu';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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
		return {
			redirect: {
				destination: '/login',
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
		console.log('success');
		return { props: { data: session } };
	}
}

export default function FriendPage({ data: session }) {
	const router = useRouter();
	const { id } = router.query;

	const { data: friend, refetch: refetchFriend } = trpc.useQuery([
		'reviewsUser.getUser',
		{ id: id },
	]);

	const { data: recommendations, refetch: refetchRecommendations } =
		trpc.useQuery(['recs.getRecommendations', { authorId: id }], trpcOptions);

	return (
		<div className={styles.main}>
			<Header session={session} />
			<HeaderMenu session={session} selected="friends" />

			{recommendations ? (
				<div>
					<p className={styles.intro}>
						Your friend {friend.name} recommended the following things:
					</p>
					{recommendations.recs.map((rec) => (
						<div key={rec.id}>
							<Recommendation
								name={rec.recName}
								detail={rec.recDetail}
								category={rec.reviewCategory}
								id={rec.id}
								refetchRecs={refetchRecommendations}
								delete={false}
							/>
						</div>
					))}
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
}
