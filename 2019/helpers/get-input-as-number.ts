import getInput = require("./get-input");

function getInputAsNumber (directory: string = process.cwd()): number[] {
	const input = getInput(directory);

	return Array.isArray(input) ?
		input.map(Number) :
		[ Number(input) ];
}

export = getInputAsNumber;