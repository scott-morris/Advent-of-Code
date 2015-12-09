/*
	This year, Santa brought little Bobby Tables a set of wires and bitwise
	logic gates! Unfortunately, little Bobby is a little under the recommended
	age range, and he needs help assembling the circuit.

	Each wire has an identifier (some lowercase letters) and can carry a
	16-bit signal (a number from 0 to 65535). A signal is provided to each
	wire by a gate, another wire, or some specific value. Each wire can only
	get a signal from one source, but can provide its signal to multiple
	destinations. A gate provides no signal until all of its inputs have a
	signal.

	The included instructions booklet describe how to connect the parts
	together: x AND y -> z means to connect wires x and y to an AND gate,
	and then connect its output to wire z.

	For example:

	- 123 -> x means that the signal 123 is provided to wire x.
	- x AND y -> z means that the bitwise AND of wire x and wire y is
		provided to wire z.
	- p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2
		and then provided to wire q.
	- NOT e -> f means that the bitwise complement of the value from wire e
		is provided to wire f.

	Other possible gates include OR (bitwise OR) and RSHIFT (right-shift).
	If, for some reason, you'd like to emulate the circuit instead, almost
	all programming languages (for example, C, JavaScript, or Python)
	provide operators for these gates.

	PART ONE:
	In little Bobby's kit's instructions booklet (provided as your puzzle input),
	what signal is ultimately provided to wire a?

	PART TWO:
	TBD
*/

/*
 	FIVE PARTS
 	{input1} AND {input2} -> {output}
 	{input1} OR {input2} -> {output}
 	{input} LSHIFT {number} -> {output}
 	{input} RSHIFT {number} -> {output}

 	FOUR PARTS
 	NOT {input} -> {output}

 	THREE PARTS
 	{input} -> {output}
 	{number} -> {output}
 */
var fs = require("fs"),
	input = fs.readFileSync("./inputs/advent_07.txt", "utf8").split("\n");

;(function (inputs) {
	var answer1,
		answer2,
		machine = {};

	inputs.forEach(function (input) {
		var parts = input.split(" "),
			input, input2, action, output;

		switch (parts.length) {
			case 5:
				input = parts[0];
				action = parts[1];
				input2 = parts[2];
				output = parts[4];

				Object.defineProperty(machine, output, {
					get: function () {
						switch (action) {
							case "AND":    return this[input]  & this[input2]; break;
							case "OR":     return this[input]  | this[input2]; break;
							case "LSHIFT": return this[input] << this[input2]; break;
							case "RSHIFT": return this[input] >> this[input2]; break;
							default:
								console.log("Unrecognized action", action);
								return 0;
						}
					}
				});
				break;

			case 4:
				action = parts[0];
				input = parts[1];
				output = parts[3];

				Object.defineProperty(machine, output, {
					get: function () {
						if (action === "NOT") {
							return ~ this[input];
						} else {
							console.log("Unrecognized action", action);
							return 0;
						}
					}
				});
				break;

			case 3:
				input = parts[0];
				output = parts[2];

				if (isNaN(input)) {
					Object.defineProperty(machine, output, {
						get: function () {
							return this[input];
						}
					});
				} else {
					machine[output] = parseInt(input, 10);
				}
		}
	});
	console.log(machine);

	answer1 = machine["a"];
	answer2 = null;

	console.log("Answer #1:", answer1);
	console.log("Answer #2:", answer2);
})(input);