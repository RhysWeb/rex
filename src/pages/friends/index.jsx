import styles from './friendsPage.module.css';
import { trpc, trpcOptions } from '../../utils/trpc';
import { Loading } from '../../components/Loading/Loading';
import { NewRec } from '../../components/NewRec/NewRec';
import { Recommendation } from '../../components/Recommendation/Recommendation';
import Header from '../../components/Header/Header';
import HeaderMenuTwo from '../../components/HeaderMenuTwo/HeaderMenuTwo';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useData } from '../../utils/DataContext';
import Friends from '../../components/Friends/Friends';
import Enemies from '../../components/Enemies/Enemies';

export async function getServerSideProps(context) {
	// return getServerSession(context);
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		console.log('no session');
		signIn('google', { callbackUrl: '/friends' });

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
		console.log('Session and user role');
		return { props: { data: session } };
	}
}

export default function RecsFriendsPage({ data: session }) {
	const { flipped, setFlipped } = useData();

	// Get all users for the dropdown (make this better)
	const { data: users, refetch: refetchUsers } = trpc.useQuery([
		'reviewsUser.getUsers',
	]);

	// Get the users friends
	const { data: friendsData, refetch: refetchFriends } = trpc.useQuery([
		'recs.getFriends',
		{ id: session.user.id },
	]);

	return (
		<div className={styles.flipContainer}>
			<Header session={session} flip={flipped} />
			<HeaderMenuTwo selected="Frenemies" flip={flipped} />

			<div
				className={`${styles.cardFlipper} ${flipped ? styles.performFlip : ''}`}
			>
				<div className={styles.cardFrontFace}>
					<Friends
						users={users}
						friendsData={friendsData}
						session={session}
						refetchFriends={refetchFriends}
					/>
				</div>

				<div className={styles.cardBackFace}>
					<Enemies users={users} friendsData={friendsData} session={session} />
				</div>
			</div>
		</div>
	);
}
