import React, { SyntheticEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import Error from './Error';
import styles from './styles.scss';
import Modal from './Modal';

const View = function View({
	field,
	players,
	activePlayer,
	onSet,
	size,
	lineLength,
	winner,
	onStart,
	onSetSize,
	onSetLineLength,
	isGameStarted,
	onSetPlayers,
	onReload,
	errors,
	isFinished,
}: {
	isFinished: boolean;
	field: Array<Array<string>>;
	players: Array<string>;
	activePlayer: string;
	winner: string | null;
	onSet: (x: number, y: number) => void;
	onSetPlayers: (players: Array<string>) => void;
	onStart: () => void;
	onSetSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSetLineLength: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onReload: () => void;
	size: number;
	lineLength: number;
	isGameStarted: boolean;
	errors: { size?: boolean; length?: boolean; name?: boolean };
}) {
	const [showModal, setShowModal] = useState(true);
	const handleClick = (x: number, y: number) => (e: SyntheticEvent) => {
		onSet(x, y);
	};

	const handlePlayerNameChange =
		(num: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const newNames = players.map((el, i) =>
				i === num ? e.target.value : el
			);
			onSetPlayers(newNames);
		};

	const isGameDisabled = Boolean(
		Object.values(errors).filter((el) => el).length
	);

	const isBigCells = field.length < 6;

	useEffect(() => setShowModal(true), [isGameStarted]);

	return (
		<div className={styles.wrapper}>
			{!isGameStarted && <div className={styles.tip}>Настройки игры</div>}
			{!isGameStarted && (
				<div className={styles.box}>
					<label className={styles.label}>
						<span>Размер поля (3-10 клеток)</span>
						<input type="text" onChange={onSetSize} value={size}></input>
						{errors.size && <Error type="size" />}
					</label>
					<label className={styles.label}>
						<span>Длина линии для победы</span>
						<input
							type="text"
							onChange={onSetLineLength}
							value={lineLength}
						></input>
						{errors.length && <Error type="length" />}
					</label>
					<label className={styles.label}>
						<span>Имя игрока 1</span>
						<input
							type="text"
							onChange={handlePlayerNameChange(0)}
							value={players[0]}
						></input>
						{errors.name && <Error type="name" />}
					</label>
					<label className={styles.label}>
						<span>Имя игрока 2</span>
						<input
							type="text"
							onChange={handlePlayerNameChange(1)}
							value={players[1]}
						></input>
						{errors.name && <Error type="name" />}
					</label>
					<button
						className={styles.button}
						onClick={onStart}
						disabled={isGameDisabled}
					>
						начать
					</button>
				</div>
			)}
			{isGameStarted && (
				<div className={styles.tip}>
					{!isFinished && activePlayer && `Ход игрока ${activePlayer}`}
					{isFinished && 'Игра окончена'}
				</div>
			)}
			{isGameStarted && (
				<div className={styles.box}>
					{showModal && (
						<Modal
							winner={winner}
							setModal={setShowModal}
							isFinished={isFinished}
						/>
					)}

					{field.map((row, i) => (
						<div key={`row_${i}`} className={styles.row}>
							{row.map((element, k) => (
								<div
									className={cx(styles.cell, {
										[styles.cellBig]: isBigCells,
									})}
									key={`el_${k}`}
								>
									<button
										className={cx(styles.cellButton, {
											[styles.cellBig]: isBigCells,
										})}
										disabled={Boolean(winner)}
										type="button"
										onClick={handleClick(i, k)}
									>
										<span>{element}</span>
									</button>
								</div>
							))}
						</div>
					))}
				</div>
			)}

			<div className={cx(styles.center, styles.bottom)}>
				<button
					className={cx(styles.button, styles.buttonCancel, {
						[styles.hasWin]: Boolean(winner),
					})}
					onClick={onReload}
				>
					сбросить и начать заново
				</button>
			</div>
		</div>
	);
};

export default View;
