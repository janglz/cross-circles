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
	lineLength: number,
	coords: Array<number>
) => {
	const [x, y] = coords;
	const horizontal = field[x];
	if (findMaxRepeatsCount(horizontal) >= lineLength) return true;

	const vertical = field.map((el) => el[y]);
	if (findMaxRepeatsCount(vertical) >= lineLength) return true;

	const leftToDown = field.map((el, i) => el[i + y - x]);
	if (findMaxRepeatsCount(leftToDown) >= lineLength) return true;

	const leftToUp = field.map((el, i) => el[x + y - i]);
	if (findMaxRepeatsCount(leftToUp) >= lineLength) return true;

	return false;
};

module.exports = { checkWin, findMaxRepeatsCount };
