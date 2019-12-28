const createPath = (instructions: string[]): string[] => {
	const path = [];

	let x: number = 0;
	let y: number = 0;

	const orthagonalFunctions = {
		R: (givenValue: string) => {
			const value: number = Number(givenValue);
			for (let i: number = 0; i < value; i++) {
				x++;
				path.push(`${x},${y}`);
			}
		},
		L: (givenValue: string) => {
			const value: number = Number(givenValue);
			for (let i: number = 0; i < value; i++) {
				x--;
				path.push(`${x},${y}`);
			}
		},
		U: (givenValue: string) => {
			const value: number = Number(givenValue);
			for (let i: number = 0; i < value; i++) {
				y++;
				path.push(`${x},${y}`);
			}
		},
		D: (givenValue: string) => {
			const value: number = Number(givenValue);
			for (let i: number = 0; i < value; i++) {
				y--;
				path.push(`${x},${y}`);
			}
		}
	};

	instructions.forEach(instruction => {
		const [ direction, amount ] = instruction;
		orthagonalFunctions[direction](amount);
	});

	return path;
}

export = createPath;