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
	Now, take the signal you got on wire a, override wire b to that signal,
	and reset the other wires (including wire a). What new signal is
	ultimately provided to wire a?
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
;(function (advent) {
	"use strict";

	var input = advent.getInputArray(7),
		assert = require("assert"),
		answer1,
		answer2;

	function addDefinition (machine, def) {
		var parts = def.split(" "),
			input1, input2, action, output;

		switch (parts.length) {
			case 5:
				input1 = parts[0];
				action = parts[1];
				input2 = parts[2];
				output = parts[4];

				// With 5 parts, input1 is always needed
				if (isNaN(input1) && !machine.hasOwnProperty(input1)) {
					// not ready yet
					break;
				}

				// With AND and OR operations, input2 is needed
				if ((action === "AND" || action === "OR") && isNaN(input2) && !machine.hasOwnProperty(input2)) {
					// not ready yet
					break;
				}

				// If machine already has definition, skip
				if (machine.hasOwnProperty(output)) {
					break;
				}

				// With SHIFT operations, input2 needs to be a number
				if ((action === "LSHIFT" || action === "RSHIFT") && isNaN(input2)) {
					throw("Invalid shift expression: " + def);
				}

				input1 = (isNaN(input1)) ? machine[input1] : parseInt(input1, 10);
				input2 = (isNaN(input2)) ? machine[input2] : parseInt(input2, 10);

				switch (action) {
					case "AND":    machine[output] = input1  & input2; break;
					case "OR":     machine[output] = input1  | input2; break;
					case "LSHIFT": machine[output] = input1 << input2; break;
					case "RSHIFT": machine[output] = input1 >> input2; break;
					default: throw("Invalid 5-part expression: " + def);
				}
				break;

			case 4:
				action = parts[0];
				input1 = parts[1];
				output = parts[3];

				if (isNaN(input1) && !machine.hasOwnProperty(input1)) {
					// not ready yet
					break;
				}

				// If machine already has definition, skip
				if (machine.hasOwnProperty(output)) {
					break;
				}

				input1 = (isNaN(input1)) ? machine[input1] : parseInt(input1, 10);

				if (action === "NOT") {
					machine[output] = ~input1;
				} else {
					throw("Invalid 4-part expression: " + def);
				}
				break;

			case 3:
				input1 = parts[0];
				output = parts[2];

				if (isNaN(input1) && !machine.hasOwnProperty(input1)) {
					// not ready yet
					break;
				}

				// If machine already has definition, skip
				if (machine.hasOwnProperty(output)) {
					break;
				}

				machine[output] = (isNaN(input1)) ? machine[input1] : parseInt(input1, 10);
				break;

			default:
				console.log("NOT PROCESSED:" + def);
		}

		// console.log("machine[" + output + "] defined", machine[output]);
		return machine.hasOwnProperty(output);
	}

	// Run tests to confirm requirements have been met
	// (function runTests () {

	// })();

	function buildMachine(defs, startingObj) {
		var iterations = 0,
			lastCount = defs.length,
			machine = startingObj || {};

		do {
			defs = defs.filter(function (def) {
				return !addDefinition(machine, def);
			});

			// Sanity check to make sure we don't get caught in an endless loop
			if (defs.length === lastCount) {
				console.log(machine);
				throw("No progress");
			}
			lastCount = defs.length;
		} while (defs.length > 0);

		return machine;
	}

	answer1 = buildMachine(input);
	answer2 = buildMachine(input, { b: answer1.a });

	advent.displayResults(answer1.a, answer2.a);
})(require("./lib/advent.js"));