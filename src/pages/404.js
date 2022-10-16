import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function FourOhfour() {
	const router = useRouter();

	useEffect(() => {
		router.push('/');
	});
	return <></>;
}
