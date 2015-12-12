/*
	Santa is trying to deliver presents in a large apartment building, but he can't find
	the right floor - the directions he got are a little confusing. He starts on the
	ground floor (floor 0) and then follows the instructions one character at a time.

	An opening parenthesis, (, means he should go up one floor, and a closing parenthesis,
	), means he should go down one floor.

	The apartment building is very tall, and the basement is very deep; he will never
	find the top or bottom floors.

	PART ONE:
	To what floor do the instructions take Santa?

	PART TWO:
	Find the position of the first character that causes him to enter the basement (floor -1).
*/
var fs = require("fs"),
	input = fs.readFileSync("./inputs/advent_01.txt", "utf8");

;(function (input) {
	var sorted = input.split("").sort().join(""),
		numUp = sorted.indexOf(")"),
		numDown = sorted.length - numUp,
		answer1 = numUp - numDown,

		answer2 = 0,
		curFloor = 0;

	input.split("").some(function (dir) {
		answer2++;
		curFloor = (dir === "(") ? curFloor + 1 : curFloor - 1;
		return curFloor < 0;
	});

	console.log("Answer #1:", answer1);
	console.log("Answer #2:", answer2);
})(input);