import React, { MouseEvent, SyntheticEvent, useState } from 'react';

const View = function View({
	field,
	players,
	activePlayer,
	onSet,
	size,
	winner,
	onStart,
	onSetSize,
	isGameStarted,
	onSetPlayers,
	onReload,
}: {
	field: Array<Array<string>>;
	players: Array<string>;
	activePlayer: string;
	winner: string | null;
	onSet: (x: number, y: number) => void;
	onSetPlayers: (players: Array<string>) => void;
	onStart: () => void;
	onSetSize: (e: React.FormEvent<HTMLInputElement>) => void;
	onReload: () => void;
	size: number;
	isGameStarted: boolean;
}) {
	const handleClick = (x: number, y: number) => (e: SyntheticEvent) => {
		e.preventDefault();
		onSet(x, y);
	};

	const handlePlayerNameChange =
		(num: number) => (e: React.FormEvent<HTMLInputElement>) => {
			const newNames = players.map((el, i) =>
				i === num ? e.currentTarget.value : el
			);
			onSetPlayers(newNames);
		};

	return (
		<div>
			{!isGameStarted && (
				<div>
					<label>
						размер поля (3-10 клеток)
						<input type="text" onChange={onSetSize} value={size}></input>
					</label>
					<label>
						имя игрока 1
						<input
							type="text"
							onChange={handlePlayerNameChange(0)}
							defaultValue={players[0]}
						></input>
					</label>
					<label>
						имя игрока 2
						<input
							type="text"
							onChange={handlePlayerNameChange(1)}
							defaultValue={players[1]}
						></input>
					</label>
					<button onClick={onStart}>начать</button>
				</div>
			)}
			{isGameStarted && (
				<div>
					<div>{activePlayer && `ход игрока ${activePlayer}`}</div>
					<div>{winner && `победил ${winner}`}</div>
					{field.map((row, i) => (
						<div key={`row_${i}`}>
							{row.map((element, k) => (
								<button
									disabled={Boolean(winner)}
									key={`el_${k}`}
									type="button"
									onClick={handleClick(i, k)}
								>
									{element}
								</button>
							))}
						</div>
					))}
				</div>
			)}

			<div>
				<button onClick={onReload}>сбросить и начать заново</button>
			</div>
		</div>
	);
};

export default View;
