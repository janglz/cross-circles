import React, { useEffect, useState } from 'react';
import View from './View';
import { checkWin } from './utils';
import { useCount } from './useCount';

const generateField = (num: number) =>
	new Array(num).fill(new Array(num).fill(null));

const getNextPlayer = (players: Array<string>, activePlayer: string) => {
	if (players[0] === activePlayer) return players[1];
	return players[0];
};

const getDefaultNames = (players: Array<string>) =>
	players.map((player, i) => player || `player ${i + 1}`);

const validateSize = (string: string | number) =>
	Number(string) >= 3 && Number(string) <= 10;

const validateLength = (length: string | number, size: number | string) =>
	Number(length) >= 3 && Number(length) <= Number(size);

const validatePlayersNames = (players: Array<string>) =>
	players[0] !== players[1];

const Field = function Field() {
	const [players, setPlayers] = useState(['player 1', 'player 2']);
	const [activePlayer, setActivePlayer] = useState(players[0]);
	const [size, setSize] = useState(3);
	const [lineLength, setLineLength] = useState(3);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [errors, setErrors] = useState({});
	const [field, setField] = useState(generateField(size));

	const [winner, setWinner] = useState<string | null>(null);
	const { next, isFinished, reset } = useCount({ size });

	const handleReset = () => {
		setActivePlayer(() => players[0]);
		setField(generateField(size));
		setIsGameStarted(false);
		setWinner(null);
		reset();
	};

	const handleSetToField = (x: number, y: number) => {
		if (field[x][y]) return;

		const symbol = activePlayer === players[0] ? 'x' : 'o';
		const newField = field.map((row, i) =>
			row.map((el: undefined, k: number) => (i === x && k === y ? symbol : el))
		);

		setField(newField);
		checkWin(newField, lineLength, [x, y])
			? setWinner(activePlayer)
			: setActivePlayer(getNextPlayer(players, activePlayer));

		next();
	};

	const handleSetSize = (e: React.ChangeEvent<HTMLInputElement>) => {
		const res = e.target.value;

		setSize(() => Number(res) || 0);
	};

	const handleSetLineLength = (e: React.ChangeEvent<HTMLInputElement>) => {
		const res = e.target.value;

		setLineLength(() => Number(res) || 0);
	};

	const handleStartGame = () => {
		setField(generateField(size));
		setPlayers(() => getDefaultNames(players));
		setActivePlayer(() => players[0]);
		setIsGameStarted(true);
	};

	const handleSetPlayers = (players: string[]) => {
		const isValid = validatePlayersNames(players);
		if (!isValid) {
			setErrors((prev) => ({ ...prev, name: true }));
			return;
		}
		setPlayers(() => players);
		setErrors((prev) => ({ ...prev, name: false }));
	};

	useEffect(() => {
		const isValidLength = validateLength(lineLength, size);
		const newError: { length?: boolean } = { ...errors };

		if (!isValidLength) {
			newError.length = true;
		}
		if (isValidLength) {
			newError.length = false;
		}

		setErrors(newError);
	}, [lineLength]);

	useEffect(() => {
		const isValidSize = validateSize(size);
		const isValidLength = validateLength(lineLength, size);
		const newErrors: { size?: boolean; length?: boolean } = { ...errors };

		if (!isValidSize) {
			newErrors.size = true;
		}
		if (isValidSize) {
			newErrors.size = false;
		}
		if (!isValidLength) {
			newErrors.length = true;
		}
		if (isValidLength) {
			newErrors.length = false;
		}

		setErrors(newErrors);
	}, [size]);

	return (
		<div className="root">
			<View
				isFinished={isFinished}
				field={field}
				errors={errors}
				activePlayer={activePlayer}
				players={players}
				onSetSize={handleSetSize}
				onSetLineLength={handleSetLineLength}
				size={size}
				lineLength={lineLength}
				onStart={handleStartGame}
				isGameStarted={isGameStarted}
				onSet={handleSetToField}
				onSetPlayers={handleSetPlayers}
				winner={winner}
				onReload={handleReset}
			/>
		</div>
	);
};

export default Field;
