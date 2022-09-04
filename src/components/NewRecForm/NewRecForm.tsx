import styles from './newRecForm.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { trpc } from '../../utils/trpc';
import { Dispatch, SetStateAction } from 'react';

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
	refetch: () => void;
	setNewRec: Dispatch<SetStateAction<boolean>>;
	authorId: string;
}

export const NewRecForm: React.FC<Props> = ({
	refetch,
	setNewRec,
	authorId,
}) => {
	const { register, handleSubmit } = useForm<FormValues>();

	const recMutation = trpc.useMutation(['recommendation.addRecommendation'], {
		onSuccess: () => {
			console.log('success');
			setNewRec(false);
			refetch();
		},
	});
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		await recMutation.mutate({
			authorId: authorId,
			recName: data.recName,
			recDetail: data.recDetail,
			rating: 5.6,
			reviewCategory: data.reviewCategory,
		});
	};

	return (
		<form
			className={styles.card}
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off"
		>
			<label className={styles.label} htmlFor="recName">
				Recommendation:{' '}
				<input {...register('recName')} type="text" className={styles.input} />
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
			{/* <label className={styles.label} htmlFor="name">
				Name:{' '}
				<input {...register('author')} type="text" className={styles.input} />
			</label>
			<div className={styles.gap} />
			<label className={styles.label} htmlFor="text">
				Comment:{' '}
				<textarea {...register('text')} className={styles.input} rows={3} />
			</label> */}

			<div className={styles.gap} />
			<input
				type="submit"
				className={styles.submit}
				value="Submit"
				disabled={recMutation.isLoading}
			/>
		</form>
	);
};
