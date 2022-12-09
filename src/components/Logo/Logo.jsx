import styles from './Logo.module.css';
import { Sansita_Swashed } from '@next/font/google';
import { useState } from 'react';
import { useData } from '../../utils/DataContext';

const sansita = Sansita_Swashed({ subsets: ['latin'] });

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Logo({ flip }) {
	const [flipping, setFlipping] = useState(false);
	const { flipped, setFlipped } = useData();
	const toggleFlip = async () => {
		if (!flipping) {
			setFlipped(!flipped);
			setFlipping(true);
			await sleep(5000);
			setFlipping(false);
		}
	};
	return (
		<div className={styles.titleContainer} onClick={toggleFlip}>
			<div
				className={`${styles.title} ${sansita.className} ${
					!flip ? styles.noflip : styles.flip
				}`}
			>
				Recs
			</div>
		</div>
	);
}
('');
