import React, { useState } from 'react';
import View from './View';
import { checkWin } from './utils';

const generateField = (num: number) =>
	new Array(num).fill(new Array(num).fill(null));

const getNextPlayer = (players: Array<string>, activePlayer: string) => {
	if (players[0] === activePlayer) return players[1];
	return players[0];
};

const formatString = (string: string) =>
	Number(string)
		? Number(string) > 3 && Number(string) < 10
			? Number(string)
			: 3
		: 5;

const Field = function Field() {
	const [players, setPlayers] = useState(['player 1', 'player 2']);
	const [activePlayer, setActivePlayer] = useState(players[0]);
	const [size, setSize] = useState(5);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [field, setField] = useState(generateField(size));

	const [winner, setWinner] = useState<string | null>(null);

	const handleStartNewGame = () => {
		setActivePlayer(players[0]);
		setField(generateField(size));
		setIsGameStarted(false);
		setWinner(null);
	};

	const handleSetToField = (x: number, y: number) => {
		if (field[x][y]) return;

		const symbol = activePlayer === players[0] ? 'x' : 'o';
		const newField = field.map((row, i) =>
			row.map((el: undefined, k: number) => (i === x && k === y ? symbol : el))
		);

		setField(newField);
		checkWin(newField, size, 3, [x, y])
			? setWinner(activePlayer)
			: setActivePlayer(getNextPlayer(players, activePlayer));
	};

	const handleSetSize = (e: React.FormEvent<HTMLInputElement>) => {
		const num = formatString(e.currentTarget.value);
		setSize(num);
		setField(generateField(num));
	};

	return (
		<div className="root">
			<View
				field={field}
				activePlayer={activePlayer}
				players={players}
				onSetSize={handleSetSize}
				size={size}
				onStart={() => setIsGameStarted(true)}
				isGameStarted={isGameStarted}
				onSet={handleSetToField}
				onSetPlayers={setPlayers}
				winner={winner}
				onReload={handleStartNewGame}
			/>
		</div>
	);
};

export default Field;
