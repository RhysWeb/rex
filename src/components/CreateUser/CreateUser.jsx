import ButtonOne from '../ButtonOne/ButtonOne';
import ButtonTwo from '../ButtonTwo/ButtonTwo';
import { trpc } from '../../utils/trpc';
import { useState } from 'react';
import styles from './CreateUser.module.css';
import { signOut } from 'next-auth/react';

const CreateUser = ({ session, refetchUser }) => {
	const mutation = trpc.useMutation(['reviewsUser.createUser'], {
		onSuccess: () => {
			console.log('success');
			refetchUser();
		},
	});

	const createAccount = (userName, id) => {
		if (typeof id !== 'string') return;
		mutation.mutate({ authUserId: id, userName });
	};

	const [userName, setUserName] = useState('');
	return (
		<div className={`${styles.flexCenter} ${styles.topGap}`}>
			<h1>Create User</h1>
			<p>
				You are signed in with google. Next, create a username for your reviews
				and click create reviews account.
			</p>

			<label>
				Username:{' '}
				<input
					value={userName}
					type="text"
					onChange={(e) => {
						setUserName(e.target.value);
					}}
				></input>
			</label>
			{mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
			<ButtonOne
				text="Create account"
				disabled={mutation.isLoading}
				onClick={() => {
					createAccount(userName, session.user.id);
				}}
				margin="3rem 0 0 0"
			/>

			<ButtonTwo
				text="Sign out of Google"
				onClick={() => {
					signOut();
				}}
				margin="3rem 0 0 0"
			/>
		</div>
	);
};

export default CreateUser;
