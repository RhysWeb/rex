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
			icon = '๐ฅ';
			break;
		case 'TV':
			icon = '๐บ';
			break;
		case 'BOOK':
			icon = '๐';
			break;
		case 'GAME':
			icon = '๐ฎ';
			break;
		case 'MUSIC':
			icon = '๐ต';
			break;
		case 'PODCAST':
			icon = '๐ฃ๏ธ';
			break;
		case 'COMIC':
			icon = '๐ฅ';
			break;
		case 'DAYOUT':
			icon = '๐งบ';
			break;
		case 'RESTAURANT':
			icon = '๐ฅ';
			break;
		case 'OTHER':
			icon = '๐ฅ';
			break;
		default:
			icon = '๐ฅ';
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
