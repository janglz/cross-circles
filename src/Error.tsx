import React from 'react';
import styles from './styles.scss';

const Error = function Error({ type }: { type: string }) {
	return (
		<div className={styles.error}>
			{type === 'length' && 'не более размеров поля и не менее 3, только цифры'}
			{type === 'size' && 'не менее 3 и не более 10, только цифры'}
		</div>
	);
};

export default Error;
