import styles from './Friends.module.css';
import { Loading } from '../Loading/Loading';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { trpc } from '../../utils/trpc';

export default function Friends({
	users,
	friendsData,
	session,
	refetchFriends,
}) {
	const { register, handleSubmit } = useForm();

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
		<>
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
									{`${user.name}🔸(${user.email})`}
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
								<Link
									className={styles.friendName}
									href={`/friends/${friend.id}`}
								>
									{friend.name}
								</Link>
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
		</>
	);
}
