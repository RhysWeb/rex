import styles from './Logo.module.css';
import { Sansita_Swashed } from '@next/font/google';

const sansita = Sansita_Swashed({ subsets: ['latin'] });

export default function Logo({ flip, toggleFlip }) {
	return (
		<div className={styles.titleContainer} onClick={toggleFlip} disable>
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
