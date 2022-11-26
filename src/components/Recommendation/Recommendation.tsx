import styles from './Recommendation.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { trpc } from '../../utils/trpc';

interface Props {
	name: string;
	detail: string;
	category: string;
	id: number;
	del: boolean;
	refetchRecs: () => void;
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

export const Recommendation: React.FC<Props> = ({
	name,
	detail,
	category,
	id,
	del,
	refetchRecs,
}) => {
	const delRecMutation = trpc.useMutation(['recs.deleteRecommendation'], {
		onSuccess: () => {
			console.log('deleted');
			refetchRecs();
		},
	});

	return (
		<div className={styles.card}>
			<div className={styles.topRow}>
				<p className={styles.name}>{`${icon(category)} ${name}`}</p>
				<p className={styles.category}>{category}</p>
				{del && (
					<button
						onClick={() => {
							delRecMutation.mutate({ id: id });
						}}
					>
						<FaTrashAlt />
					</button>
				)}
			</div>
			<div className={styles.content}>{detail}</div>
		</div>
	);
};
