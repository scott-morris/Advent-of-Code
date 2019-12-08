import computeWithParameters = require("./compute-with-parameters");
import ora = require("ora");

const findValue = (value: number, data: number[]): number => {
	const spinner = ora("Running loops...").start();

	let noun: number;
	let verb: number;

	outerLoop:
	for (noun = 0; noun < 100; noun++) {
		spinner.text = `Running loop ${noun}...`;

		for (verb = 0; verb < 100; verb++) {
			const result = computeWithParameters(data, noun, verb);

			if (result === value) {
				break outerLoop;
			}
		}
	}
	spinner.succeed();

	return (noun * 100) + verb;
};

export = findValue;