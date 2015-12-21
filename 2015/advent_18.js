/*
	After the million lights incident, the fire code has gotten stricter: now, at
	most ten thousand lights are allowed. You arrange them in a 100x100 grid.

	Never one to let you down, Santa again mails you instructions on the ideal
	lighting configuration. With so few lights, he says, you'll have to resort to
	animation.

	Start by setting your lights to the included initial configuration (your
	puzzle input). A # means "on", and a . means "off".

	Then, animate your grid in steps, where each step decides the next
	configuration based on the current one. Each light's next state (either on or
	off) depends on its current state and the current states of the eight lights
	adjacent to it (including diagonals). Lights on the edge of the grid might
	have fewer than eight neighbors; the missing ones always count as "off".

	For example, in a simplified 6x6 grid, the light marked A has the neighbors
	numbered 1 through 8, and the light marked B, which is on an edge, only has
	the neighbors marked 1 through 5:

		1B5...
		234...
		......
		..123.
		..8A4.
		..765.

	The state a light should have next is based on its current state (on or off)
	plus the number of neighbors that are on:

		- A light which is on stays on when 2 or 3 neighbors are on, and turns off
		  otherwise.
		- A light which is off turns on if exactly 3 neighbors are on, and stays
		  off otherwise.
		- All of the lights update simultaneously; they all consider the same current
		  state before moving to the next.

	Here's a few steps from an example configuration of another 6x6 grid:

	Initial state:
		.#.#.#
		...##.
		#....#
		..#...
		#.#..#
		####..

	After 1 step:
		..##..
		..##.#
		...##.
		......
		#.....
		#.##..

	After 2 steps:
		..###.
		......
		..###.
		......
		.#....
		.#....

	After 3 steps:
		...#..
		......
		...#..
		..##..
		......
		......

	After 4 steps:
		......
		......
		..##..
		..##..
		......
		......

	After 4 steps, this example has four lights on.

	PART ONE:
	In your grid of 100x100 lights, given your initial configuration, how many
	lights are on after 100 steps?

	PART TWO:
	Describe answer #2
*/
;(function (advent) {
	var input = advent.getInputArray(18),
		assert = require("assert"),
		STATES = {
			ON: "#",
			OFF: "."
		};

	function numNeighbors (grid, x, y) {
		var numOn = 0,
			tx, ty;

		try {
			for (tx = -1; tx <= 1; tx++) {
				for (ty = -1; ty <= 1; ty++) {
					if ((tx !== 0 || ty !== 0) &&
						(x + tx) !== -1 && 
						(y + ty) !== -1 &&
						(x + tx) !== grid.length &&
						(y + ty) !== grid[0].length &&
						grid[x + tx][y + ty] === STATES.ON) {

						numOn++;
					}
				}
			}
		} catch (err) {
			console.log(grid, x, y, tx, ty);
			throw (err);
		}

		return numOn;
	}

	function newValue (grid, x, y) {
		var neighbors = numNeighbors(grid, x, y);

		if (grid[x][y] === STATES.ON && (neighbors === 2 || neighbors === 3)) {
			return STATES.ON;
		} else if (grid[x][y] === STATES.OFF && neighbors === 3) {
			return STATES.ON;
		}

		return STATES.OFF;
	}

	function animate (input) {
		var lastState = input.map(function (row) { return row.split(""); }),
			nextState = [],
			neighbors,
			x, y;

		for (y = 0; y < input.length; y++) {
			nextState[y] = [];

			for (x = 0; x < input[y].length; x++) {
				nextState[y].push(newValue(lastState, x, y));
			}
		}

		return nextState.map(function (row) { return row.join(""); });
	}

	function answer1 (str) {

	}

	function answer2 (str) {

	}

	// Run tests to confirm requirements have been met
	(function runTests () {
		var testLights = [
				".#.#.#",
				"...##.",
				"#....#",
				"..#...",
				"#.#..#",
				"####.."
			],
			test1step = [
				"..##..",
				"..##.#",
				"...##.",
				"......",
				"#.....",
				"#.##.."
			];

		assert.deepEqual(animate(testLights), test1step);
	})();

	advent.displayResults(answer1(str), answer2(str));
})(require("./lib/advent.js"));