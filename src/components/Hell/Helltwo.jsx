import styles from './HellPage.module.css';
import { trpc } from '../../utils/trpc';
import { NewRec } from '../NewRec/NewRec';
import { Recommendation } from '../Recommendation/Recommendation';
import { Loading } from '../Loading/Loading';

export default function Helltwo({ recs, refetch, session }) {
	// Get the users recommendations

	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<NewRec refetchRecs={refetch} authorId={session.user.id} />

				{recs ? (
					recs.recs.map((rec) => (
						<div key={rec.id}>
							<Recommendation
								name={rec.recName}
								detail={rec.recDetail}
								category={rec.reviewCategory}
								id={rec.id}
								refetchRecs={refetch}
								del={true}
							/>
						</div>
					))
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}
