import { trpc } from '../../utils/trpc';
import styles from './signUpPage.module.css';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Image from 'next/image';
import ButtonOne from '../../components/ButtonOne/ButtonOne';
import { useRouter } from 'next/router';

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
	}

	if (session.user.role) {
		console.log('user has session and a role');
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	} else {
		console.log('user has session but no role');
		return { props: { data: session } };
	}
}

export default function SignUp({ data: session }) {
	const router = useRouter();

	const mutation = trpc.useMutation(['reviewsUser.createUser'], {
		onSuccess: () => {
			console.log('success');
			router.push('/');
		},
	});
	return (
		<div className={styles.main}>
			<div className={styles.hello}>
				<div className={styles.name}>Hello {session.user.name}</div>

				<div className={styles.imageContainer}>
					<Image
						src={session.user.image}
						alt="user Image"
						width={1000}
						height={1000}
						placeholder="blur"
						blurDataURL={session.user.image}
					/>
				</div>
			</div>
			<div className={styles.content}>Would you like to sign up to Recs?</div>
			<div>
				<ButtonOne
					margin="0 0 3rem 0"
					text="Yes, sign up"
					onClick={() => {
						mutation.mutate({ id: session.user.id });
					}}
					disabled={false}
				/>
			</div>
			<div className={styles.content}>
				We&apos;re a free webapp that you and your friends can use to make
				recommendations to each other.
			</div>
			<div className={styles.content}>You can recommend anything you like.</div>
		</div>
	);
}
