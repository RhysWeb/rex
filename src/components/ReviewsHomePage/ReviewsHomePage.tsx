import { ReviewsUser } from '@prisma/client';
import styles from './ReviewsHomePage.module.css';

interface Props {
	user: ReviewsUser;
}

export const ReviewsHomePage: React.FC<Props> = ({ user }) => {
	return (
		<div className={styles.main}>
			<p>{user.authUserId}</p>
		</div>
	);
};
