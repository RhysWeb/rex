import React, { FC } from 'react';
import styles from './ButtonTwo.module.css';

interface ButtonTwoProps {
	onClick: () => void;
	text: string;
	margin?: string;
}

const ButtonTwo: FC<ButtonTwoProps> = ({ onClick, text: name, margin }) => (
	<button
		onClick={onClick}
		className={styles.button}
		style={{ margin: margin }}
	>
		{name}
	</button>
);

export default ButtonTwo;
