// export const checkWin = (
// 	field: Array<Array<string>>,
// 	size: number,
// 	lineLength: number
// ) => {
// 	// const matrix = new Array(size).fill(new Array(size).map((el, i) => i))
// 	// const resultMatrix = matrix.reduce((acc, curr, i) => ,[])

// 	let Yneibours = 1;
// 	let maxYneighbours = 1;
// 	let YXneighbours = 1;
// 	let maxYXneighbours = 1;
// 	let XYneighbours = 1;
// 	let maxXYneighbours = 1;

// 	for (let i = 0; i < field.length; i++) {
// 		const Xneighbours = field[i].reduce(
// 			(acc: any, el, i, arr) => {
// 				if (typeof el === 'string' && acc.el === el) {
// 					const count = (acc.count += 1);
// 					const max = Math.max(acc.count, acc.max);
// 					return {
// 						...acc,
// 						el,
// 						count,
// 						max,
// 					};
// 				}
// 				return acc;
// 			},
// 			{ el: field[i][0], count: 0, max: 0 } as {
// 				el: string;
// 				count: number;
// 				max: number;
// 			}
// 		);
// 		if (Xneighbours.max >= lineLength) {
// 			console.log(Xneighbours);
// 			return true;
// 		}

// 		for (let k = 1; k >= field.length; k++) {
// 			const current = field[i][k];
// 			if (
// 				field[i - 1][k - 1] === current &&
// 				typeof field[i - 1][k - 1] === 'string'
// 			) {
// 				XYneighbours += 1;
// 				maxXYneighbours = Math.max(maxXYneighbours, XYneighbours);
// 			} else {
// 				XYneighbours = 1;
// 			}
// 			if (field[i - 1][k] === current && typeof field[i - 1][k] === 'string') {
// 				Yneibours += 1;
// 				maxYneighbours = Math.max(maxYneighbours, Yneibours);
// 			} else {
// 				Yneibours = 1;
// 			}
// 			if (
// 				field[i - 1][k + 1] === current &&
// 				typeof field[i - 1][k + 1] === 'string'
// 			) {
// 				YXneighbours += 1;
// 				maxYXneighbours = Math.max(maxYXneighbours, YXneighbours);
// 			} else {
// 				YXneighbours = 1;
// 			}

// 			if (
// 				maxXYneighbours >= lineLength ||
// 				maxYXneighbours >= lineLength ||
// 				maxXYneighbours >= lineLength
// 			)
// 				return true;
// 		}
// 	}
// 	return false;
// };

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

	console.log(res);
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
