import { NotSignedIn } from '../../components/NotSignedInContent/NotSignedIn';

import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (session) {
		console.log('session');
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	} else {
		console.log('no session');
		return { props: {} };
	}
}

export default function Login({}) {
	return <NotSignedIn />;
}
