import React, { SyntheticEvent, useEffect } from 'react';
import cx from 'classnames';
import Error from './Error';
import styles from './styles.scss';

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
}: {
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
	errors: { size?: boolean; length?: boolean };
}) {
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

	const isGameDisabled = errors.size || errors.length;

	return (
		<div className={styles.wrapper}>
			{!isGameStarted && (
				<div className={styles.box}>
					<label>
						размер поля (3-10 клеток)
						<input
							type="text"
							onChange={onSetSize}
							value={size}
							className={cx({ [styles.error]: errors.size })}
						></input>
						{errors.size && <Error type="size" />}
					</label>
					<label>
						длина линии для победы
						<input
							type="text"
							onChange={onSetLineLength}
							value={lineLength}
							className={cx({ [styles.error]: errors.length })}
						></input>
						{errors.length && <Error type="length" />}
					</label>
					<label>
						имя игрока 1
						<input
							type="text"
							onChange={handlePlayerNameChange(0)}
							value={players[0]}
						></input>
					</label>
					<label>
						имя игрока 2
						<input
							type="text"
							onChange={handlePlayerNameChange(1)}
							value={players[1]}
						></input>
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
				<div className={styles.box}>
					<div>{activePlayer && `ход игрока ${activePlayer}`}</div>
					{winner && (
						<div className={cx(styles.winner)}>
							<span>победил {winner}</span>
						</div>
					)}
					{field.map((row, i) => (
						<div key={`row_${i}`} className={styles.row}>
							{row.map((element, k) => (
								<div className={styles.cell} key={`el_${k}`}>
									<button
										className={styles.cellButton}
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

			<div className={styles.center}>
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
