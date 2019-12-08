import Computer = require("./computer");

const computeWithParameters = (data: number[], noun: number, verb: number): number => {
	// Make a copy of the array so we don't mutate it.
	const memory = [].concat(data);

	// Set the noun and verb
	memory[1] = noun;
	memory[2] = verb;

	const computer = new Computer(memory);
	computer.run();

	return computer.state[0];
}

export = computeWithParameters;