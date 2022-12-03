import styles from './Enemies.module.css';
import { Loading } from '../Loading/Loading';
import Link from 'next/link';

export default function Enemies({
	handleSubmit,
	onSubmit,
	register,
	users,
	friendsData,
	session,
}) {
	return (
		<>
			<form className={styles.newFriendForm} onSubmit={handleSubmit(onSubmit)}>
				<p className={styles.newFriendTitle}>Add a new Enemy? </p>
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
				<p className={styles.newFriendTitle}>Your Enemies:</p>
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
