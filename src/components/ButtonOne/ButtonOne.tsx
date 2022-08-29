import React, { FC } from 'react';
import styles from './ButtonOne.module.css';

interface ButtonOneProps {
	onClick: () => void;
	text: string;
	margin?: string;
	disabled?: boolean;
}

const ButtonOne: FC<ButtonOneProps> = ({
	onClick,
	text: name,
	margin,
	disabled,
}) => (
	<button
		onClick={onClick}
		className={styles.button}
		style={{ margin: margin }}
		disabled={disabled}
	>
		{name}
	</button>
);

export default ButtonOne;
