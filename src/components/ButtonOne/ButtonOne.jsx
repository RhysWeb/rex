import React, { FC } from 'react';
import styles from './ButtonOne.module.css';

const ButtonOne = ({ onClick, text: name, margin, disabled }) => (
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
