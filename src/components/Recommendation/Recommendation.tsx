import styles from './Recommendation.module.css';

interface Props {
	name: string;
	detail: string;
	category: string;
}

const icon = (type: string): string => {
	let icon: string;

	switch (type) {
		case 'FILM':
			icon = '🎥';
			break;
		case 'TV':
			icon = '📺';
			break;
		case 'BOOK':
			icon = '📖';
			break;
		case 'GAME':
			icon = '🎮';
			break;
		case 'MUSIC':
			icon = '🎵';
			break;
		case 'PODCAST':
			icon = '🗣️';
			break;
		case 'COMIC':
			icon = '💥';
			break;
		case 'DAYOUT':
			icon = '🧺';
			break;
		case 'RESTAURANT':
			icon = '🥗';
			break;
		case 'OTHER':
			icon = '🔥';
			break;
		default:
			icon = '🔥';
	}

	return icon;
};

export const Recommendation: React.FC<Props> = ({ name, detail, category }) => {
	return (
		<div className={styles.card}>
			<div className={styles.topRow}>
				<p className={styles.name}>{`${icon(category)} ${name}`}</p>
				<p className={styles.date}>{category}</p>
			</div>
			<div className={styles.content}>{detail}</div>
		</div>
	);
};
