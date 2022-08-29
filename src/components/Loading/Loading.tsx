import styles from './Loading.module.css';

interface Props {}

export const Loading: React.FC<Props> = ({}) => {
	return (
		<div className={styles.main}>
			<p>Loading...</p>
		</div>
	);
};
