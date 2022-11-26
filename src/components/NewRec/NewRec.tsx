import styles from './newRec.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { trpc } from '../../utils/trpc';
import { Dispatch, SetStateAction, useState } from 'react';
import ButtonOne from '../ButtonOne/ButtonOne';

const selectOptions = (
	<>
		<option value="FILM">Film</option>
		<option value="TV">TV</option>
		<option value="BOOK">Book</option>
		<option value="GAME">Game</option>
		<option value="MUSIC">Music</option>
		<option value="PODCAST">Podcast</option>
		<option value="COMIC">Comic</option>
		<option value="DAYOUT">Dayout</option>
		<option value="RESTAURANT">Restaurant</option>
		<option value="OTHER">Other</option>
	</>
);
type FormValues = {
	authorId: string;
	recName: string;
	recDetail: string;
	rating: number;
	reviewCategory:
		| 'FILM'
		| 'TV'
		| 'BOOK'
		| 'GAME'
		| 'MUSIC'
		| 'PODCAST'
		| 'COMIC'
		| 'DAYOUT'
		| 'RESTAURANT'
		| 'OTHER';
};

interface Props {
	refetchRecs: () => void;
	setNewRec: Dispatch<SetStateAction<boolean>>;
	authorId: string;
}

export const NewRec: React.FC<Props> = ({ refetchRecs, authorId }) => {
	const [viewNewRec, setNewRec] = useState(false);
	function toggleNewComment() {
		setNewRec(!viewNewRec);
	}
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const recMutation = trpc.useMutation(['recs.addRecommendation'], {
		onSuccess: () => {
			console.log('success');
			setNewRec(false);
			refetchRecs();
		},
	});
	const onSubmit: SubmitHandler<FormValues> = (data) => {
		recMutation.mutate({
			authorId: authorId,
			recName: data.recName,
			recDetail: data.recDetail,
			rating: 5.6,
			reviewCategory: data.reviewCategory,
		});
		reset();
	};

	return (
		<div className={styles.content2}>
			<div className={styles.button}>
				<ButtonOne
					text="Add rec"
					onClick={toggleNewComment}
					margin="1rem 0 2rem 0"
					disabled={false}
				/>
			</div>
			{viewNewRec && (
				<form
					className={styles.card}
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off"
				>
					<label className={styles.label} htmlFor="recName">
						Recommendation:{' '}
						<input
							{...register('recName')}
							type="text"
							className={styles.input}
						/>
					</label>
					<label className={styles.label} htmlFor="recDetail">
						Comment:{' '}
						<textarea
							{...register('recDetail')}
							className={styles.input}
							rows={3}
						/>
					</label>
					<label className={styles.label} htmlFor="reviewCategory">
						Category:{' '}
						<select className={styles.select} {...register('reviewCategory')}>
							{selectOptions}
						</select>
					</label>

					<div className={styles.gap} />
					<input
						type="submit"
						className={styles.submit}
						value="Submit"
						disabled={recMutation.isLoading}
					/>
				</form>
			)}
		</div>
	);
};
