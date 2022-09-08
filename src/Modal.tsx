import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './styles.scss';

const Modal = function Modal({
	winner,
	setModal,
	isFinished,
}: {
	isFinished: boolean;
	winner: string | null;
	setModal: (bool: boolean) => void;
}) {
	return (
		<Fragment>
			{winner && (
				<div className={cx(styles.winner)}>
					<span>Победил {winner}</span>
					<button type="button" onClick={() => setModal(false)}>
						x
					</button>
				</div>
			)}
			{isFinished && !winner && (
				<div className={cx(styles.winner)}>
					<span>Ничья!</span>
					<button type="button" onClick={() => setModal(false)}>
						x
					</button>
				</div>
			)}
		</Fragment>
	);
};

export default Modal;
