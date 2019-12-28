interface XYObject {
	x?: number,
	y?: number
}

interface Day03Input {
	wire1: XYObject[],
	wire2: XYObject[]
}

const directionFunctions = {
	U: (amount) => ({ y: amount }),
	D: (amount) => ({ y: -amount }),
	R: (amount) => ({ x: amount }),
	L: (amount) => ({ x: -amount })
};

const toXYObject = (vector: string): XYObject => {
	const [ direction, ...amountArray ] = vector;
	const amount = Number(amountArray.join());

	return directionFunctions[direction](amount);
}

const processData = (rawData: string[]): Day03Input => {
	const [ line1, line2 ] = rawData;

	return {
		wire1: line1.split(",").map(toXYObject),
		wire2: line2.split(",").map(toXYObject)
	};
}

export = processData;