import { useState } from 'react';

const BASE_MAX_COUNT = 9;

export const useCount = function useCountHook({ size }: { size: number }) {
	const [count, setCount] = useState(1);
	const [isFinished, setIsFinished] = useState(false);
	const maxCounts = Number(size) ** 2 || BASE_MAX_COUNT;

	const next = () => {
		setCount((prev) => prev + 1);
		if (count === maxCounts) {
			setIsFinished(true);
		}
	};

	const reset = () => {
		setCount(1);
		setIsFinished(false);
	};

	return {
		next,
		isFinished,
		reset,
		count,
	};
};
