import Image from 'next/image';
import ButtonOne from '../ButtonOne/ButtonOne';
import styles from './Header.module.css';
import { signOut } from 'next-auth/react';

const Header = ({ session, recsUser }) => {
	return (
		<div className={styles.hero}>
			<div className={styles.nameBadge}>
				<div className={styles.imageContainer}>
					<Image
						src={session.user.image}
						alt="user Image"
						width={1000}
						height={1000}
						placeholder="blur"
						blurDataURL={session.user.image}
					/>
				</div>
				<div className={styles.name}>{recsUser.userName}</div>
			</div>
			<div className={styles.logOutButtonContainer}>
				<ButtonOne
					text="Sign out"
					onClick={() => {
						signOut();
					}}
					margin="0 0 0 0"
					disabled={false}
				/>
			</div>
		</div>
	);
};

export default Header;
