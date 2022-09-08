import React from 'react';
import styles from './styles.scss';

const Error = function Error({ type }: { type: string }) {
	return (
		<div className={styles.error}>
			{type === 'length' && 'Число не меньше 3 и не больше размера поля'}
			{type === 'size' && 'Число от 3 до 10'}
			{type === 'name' && 'Имена должны различаться'}
		</div>
	);
};

export default Error;
