/*
	Santa is delivering presents to an infinite two-dimensional grid of houses.

	He begins by delivering a present to the house at his starting location, and then
	an elf at the North Pole calls him via radio and tells him where to move next.
	Moves are always exactly one house to the north (^), south (v), east (>), or west
	(<). After each move, he delivers another present to the house at his new location.

	However, the elf back at the north pole has had a little too much eggnog, and so his
	directions are a little off, and Santa ends up visiting some houses more than once.

	For example:

	- > delivers presents to 2 houses: one at the starting location, and one to
	  the east.

	- ^>v< delivers presents to 4 houses in a square, including twice to the house
	  at his starting/ending location.

	- ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only
	  2 houses.

	PART ONE:
	How many houses receive at least one present?

	----

	The next year, to speed up the process, Santa creates a robot version of himself,
	Robo-Santa, to deliver presents with him.

	Santa and Robo-Santa start at the same location (delivering two presents to the same
	starting house), then take turns moving based on instructions from the elf, who is
	eggnoggedly reading from the same script as the previous year.

	For example:

	- ^v delivers presents to 3 houses, because Santa goes north, and then Robo-
	  Santa goes south.

	- ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back
	  where they started.

	- ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one
	  direction and Robo-Santa going the other.

	PART TWO:
	This year, how many houses receive at least one present?
*/
;(function (advent) {
	var input = advent.getInput(3),
		assert = require("assert");

	function GiftDropper (tracking) {
		this.x = 0;
		this.y = 0;
		this.track = tracking;

		this.move = function (direction) {
			var node;

			switch (direction) {
				case "^": this.y++; break;
				case "v": this.y--; break;
				case "<": this.x--; break;
				case ">": this.x++; break;
			}

			node = this.x + "_" + this.y;

			if (this.track.hasOwnProperty(node)) {
				this.track[node]++;
			} else {
				this.track[node] = 0;
			}
		}
	}

	function answer1 (input) {
		var node = { "0_0": 0 },
			dropper = new GiftDropper(node);

		input.split("").forEach(function (direction) {
			dropper.move(direction);
		});

		return Object.keys(node).length;		
	}

	function answer2 (input) {
		var node = { "0_0": 0 },
			dropper1 = new GiftDropper(node),
			dropper2 = new GiftDropper(node);

		input.split("").forEach(function (direction, i) {
			if (i % 2 !== 0) {
				dropper1.move(direction);
			} else {
				dropper2.move(direction);
			}
		});

		return Object.keys(node).length;
	}

	// Run tests to confirm requirements have been met
	(function runTests () {
		assert.equal(answer1(">"), 2);
		assert.equal(answer1("^>v<"), 4);
		assert.equal(answer1("^v^v^v^v^v"), 2);

		assert.equal(answer2("^v"), 3);
		assert.equal(answer2("^>v<"), 3);
		assert.equal(answer2("^v^v^v^v^v"), 11);
	})();

	advent.displayResults(
		answer1(input),
		answer2(input)
	);
})(require("./lib/advent.js"));