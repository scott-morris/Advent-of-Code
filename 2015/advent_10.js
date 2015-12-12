/*
	Today, the Elves are playing a game called look-and-say. They take turns
	making sequences by reading aloud the previous sequence and using that reading
	as the next sequence. For example, 211 is read as "one two, two ones", which
	becomes 1221 (1 2, 2 1s).

	Look-and-say sequences are generated iteratively, using the previous value as
	input for the next step. For each step, take the previous value, and replace
	each run of digits (like 111) with the number of digits (3) followed by the
	digit itself (1).

	For example:

	- 1 becomes 11 (1 copy of digit 1).
	- 11 becomes 21 (2 copies of digit 1).
	- 21 becomes 1211 (one 2 followed by one 1).
	- 1211 becomes 111221 (one 1, one 2, and two 1s).
	- 111221 becomes 312211 (three 1s, two 2s, and one 1).

	PART ONE:
	Starting with the digits in your puzzle input, apply this process 40
	times. What is the length of the result?

	PART TWO:
	Now, starting again with the digits in your puzzle input, apply this
	process 50 times. What is the length of the new result?

*/
var fs = require("fs"),
	assert = require("assert"),
	input = fs.readFileSync("./inputs/advent_10.txt", "utf8");

;(function (input) {
	var output,
		answer1,
		answer2,
		i;

	function lookAndSay (str) {
		var chars = str.split(""),
			lastLetter = chars[0],
			numSame = 1,
			output = "";

		for (var i = 1; i < chars.length; i++) {
			if (lastLetter !== chars[i]) {
				output += numSame + lastLetter;
				
				lastLetter = chars[i];
				numSame = 1;
			} else {
				numSame++;
			}
		}

		output += numSame + lastLetter;

		return output;
	}

	// Include Test Cases, if applicable
	assert.equal(lookAndSay("1"), "11");
	assert.equal(lookAndSay("11"), "21");
	assert.equal(lookAndSay("21"), "1211");
	assert.equal(lookAndSay("1211"), "111221");
	assert.equal(lookAndSay("111221"), "312211");

	// Run iteratively 40 times
	output = input;
	for (i = 0; i < 40; i++) {
		output = lookAndSay(output);
	}

	answer1 = output.length;

	// Run iteratively 10 more times
	for (i = 0; i < 10; i++) {
		output = lookAndSay(output);
	}

	answer2 = output.length;

	console.log("Answer #1:", answer1);
	console.log("Answer #2:", answer2);
})(input);