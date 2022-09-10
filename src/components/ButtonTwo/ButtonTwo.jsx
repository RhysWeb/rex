import styles from './ButtonTwo.module.css';

const ButtonTwo = ({ onClick, text: name, margin }) => (
	<button
		onClick={onClick}
		className={styles.button}
		style={{ margin: margin }}
	>
		{name}
	</button>
);

export default ButtonTwo;
