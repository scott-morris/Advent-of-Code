/*
	Santa is trying to deliver presents in a large apartment building, but he can't find
	the right floor - the directions he got are a little confusing. He starts on the
	ground floor (floor 0) and then follows the instructions one character at a time.

	An opening parenthesis, (, means he should go up one floor, and a closing parenthesis,
	), means he should go down one floor.

	The apartment building is very tall, and the basement is very deep; he will never
	find the top or bottom floors.

	For example:

	- (()) and ()() both result in floor 0.
	- ((( and (()(()( both result in floor 3.
	- ))((((( also results in floor 3.
	- ()) and ))( both result in floor -1 (the first basement level).
	- ))) and )())()) both result in floor -3.

	- ) causes him to enter the basement at character position 1.
    - ()()) causes him to enter the basement at character position 5.


	PART ONE:
	To what floor do the instructions take Santa?

	PART TWO:
	Find the position of the first character that causes him to enter the basement (floor -1).
*/
;(function (advent) {
	var input = advent.getInput(1),
		assert = require("assert");

	function answer1 (input) {
		var sorted = input.split("").sort().join(""),
			numUp = (sorted.indexOf(")") > -1) ? sorted.indexOf(")") : sorted.length,
			numDown = sorted.length - numUp;

		return numUp - numDown;
	}

	function answer2 (input) {
		var steps = 0,
			curFloor = 0;

		input.split("").some(function (dir) {
			steps++;
			curFloor = (dir === "(") ? curFloor + 1 : curFloor - 1;
			return curFloor < 0;
		});
		
		return steps;
	}

	// Run tests to confirm requirements have been met
	(function runTests () {
		assert.equal(answer1("(())"), 0);
		assert.equal(answer1("()()"), 0);
		assert.equal(answer1("((("), 3);
		assert.equal(answer1("(()(()("), 3);
		assert.equal(answer1("))((((("), 3);
		assert.equal(answer1("())"), -1);
		assert.equal(answer1("))("), -1);
		assert.equal(answer1(")))"), -3);
		assert.equal(answer1(")())())"), -3);

		assert.equal(answer2(")"), 1);
		assert.equal(answer2("()())"), 5);
	})();

	advent.displayResults(answer1(input), answer2(input));
})(require("./lib/advent.js"));