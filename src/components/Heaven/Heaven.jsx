import styles from './HeavenPage.module.css';
import { trpc } from '../../utils/trpc';
import { NewRec } from '../NewRec/NewRec';
import { Recommendation } from '../Recommendation/Recommendation';
import { Loading } from '../Loading/Loading';
import Header from '../Header/Header';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

export default function Heaven({ recs, refetch, session }) {
	// Get the users recommendations

	return (
		<div className={styles.main}>
			<Header session={session} />
			<HeaderMenu selected="recommendations" />

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
