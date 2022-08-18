const findMaxRepeatsCount = (arr: Array<any>) => {
	const res = arr.reduce(
		(acc: any, el, i, arr) => {
			if (typeof el === 'string' && acc.el === el) {
				const count = (acc.count += 1);
				const max = Math.max(acc.count, acc.max);
				return {
					...acc,
					el,
					count,
					max,
				};
			}
			const max = Math.max(acc.count, acc.max);
			return {
				...acc,
				el,
				count: el ? 1 : 0,
				max,
			};
		},
		{ el: arr[0], count: 0, max: 0 } as {
			el: string;
			count: number;
			max: number;
		}
	).max;

	return res;
};

export const checkWin = (
	field: Array<Array<string>>,
	size: number,
	lineLength: number,
	coords: Array<number>
) => {
	// const resultMatrix = matrix.reduce((acc, curr, i) => ,[])
	const [x, y] = coords;
	const horizontal = field[x]; //.slice(y - lineLength, y + lineLength);
	if (findMaxRepeatsCount(horizontal) >= lineLength) return true;
	const vertical = field.map((el) => el[y]);
	//.slice(x - lineLength, x + lineLength);
	if (findMaxRepeatsCount(vertical) >= lineLength) return true;

	const leftToDown = field.map((el, i) => {
		return el[i + y - x];
	});
	if (findMaxRepeatsCount(leftToDown) >= lineLength) return true;

	const leftToUp = field.map((el, i) => {
		return el[x + y - i];
	});
	if (findMaxRepeatsCount(leftToUp) >= lineLength) return true;

	return false;
};

module.exports = { checkWin, findMaxRepeatsCount };
