import styles from './friendsPage.module.css';
import { trpc } from '../../utils/trpc';
import { Loading } from '../../components/Loading/Loading';
import { NewRec } from '../../components/NewRec/NewRec';
import { Recommendation } from '../../components/Recommendation/Recommendation';
import Header from '../../components/Header/Header';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useForm } from 'react-hook-form';

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

export default function RecsFriendsPage({ data: session }) {
	const { register, handleSubmit } = useForm();
	// Get the users friends
	console.log('calling trpc getUsers');
	const { data: users, refetch: refetchUsers } = trpc.useQuery([
		'reviewsUser.getUsers',
	]);

	const { data: friendsData, refetch: refetchFriends } = trpc.useQuery([
		'recs.getFriends',
		{ id: session.user.id },
	]);

	const addFriendMutation = trpc.useMutation(['recs.addFriend'], {
		onSuccess: () => {
			console.log('success');
			refetchFriends();
		},
	});

	const onSubmit = (data) => {
		console.table(data);
		addFriendMutation.mutate({
			id: session.user.id,
			friendId: data.newFriend,
		});
	};

	const delFriendMutation = trpc.useMutation(['recs.delFriend'], {
		onSuccess: () => {
			console.log('friend successfully deleted');
			refetchFriends();
		},
	});

	const removeFriend = (friendId) => {
		console.table(friendId);
		delFriendMutation.mutate({
			id: session.user.id,
			friendId: friendId,
		});
	};

	return (
		<div className={styles.main}>
			<Header session={session} />
			<HeaderMenu session={session} selected="friends" />
			<form className={styles.newFriendForm} onSubmit={handleSubmit(onSubmit)}>
				<p className={styles.newFriendTitle}>Add a new friend? </p>
				<select {...register('newFriend')} className={styles.newFriendSelect}>
					<option disabled selected value>
						{' '}
						-- select an option --{' '}
					</option>
					{users?.map((user) => {
						if (user.id !== session.user.id) {
							return (
								<option key={user.id} value={user.id}>
									{user.name}
								</option>
							);
						}
					})}
				</select>
				<input type="submit" className={styles.newFriendButton} />
			</form>
			<div className={styles.newFriendForm}>
				<p className={styles.newFriendTitle}>Your friends:</p>
				{friendsData ? (
					friendsData.friends.friends?.map((friend) => {
						return (
							<div key={friend.id} className={styles.friend}>
								<p className={styles.friendName}>{friend.name}</p>
								<button
									className={styles.friendRemoveButton}
									onClick={() => {
										removeFriend(friend.id);
									}}
								>
									Remove
								</button>
							</div>
						);
					})
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}