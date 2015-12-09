/*
	Because your neighbors keep defeating you in the holiday house decorating
	contest year after year, you've decided to deploy one million lights in a
	1000x1000 grid.

	Furthermore, because you've been especially nice this year, Santa has
	mailed you instructions on how to display the ideal lighting configuration.

	Lights in your grid are numbered from 0 to 999 in each direction; the
	lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The
	instructions include whether to turn on, turn off, or toggle various
	inclusive ranges given as coordinate pairs. Each coordinate pair represents
	opposite corners of a rectangle, inclusive; a coordinate pair like 0,0
	through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all
	start turned off.

	To defeat your neighbors this year, all you have to do is set up your
	lights by doing the instructions Santa sent you in order.

	PART ONE:
	After following the instructions, how many lights are lit?

	----

	You just finish implementing your winning light pattern when you realize
	you mistranslated Santa's message from Ancient Nordic Elvish.

	The light grid you bought actually has individual brightness controls;
	each light can have a brightness of zero or more. The lights all start at
	zero.

	The phrase turn on actually means that you should increase the brightness
	of those lights by 1.

	The phrase turn off actually means that you should decrease the brightness
	of those lights by 1, to a minimum of zero.

	The phrase toggle actually means that you should increase the brightness
	of those lights by 2.

	PART TWO:
	What is the total brightness of all lights combined after following
	Santa's instructions?
*/
var fs = require("fs"),
	input = fs.readFileSync("./inputs/advent_06.txt", "utf8").split("\n");

;(function (input) {
	var answer1 = 0,
		answer2 = 0,
		re = /(\w+)\s+(\d+),(\d+)\D*(\d+),(\d+)/,
		grid = [],
		row = [],
		x = 0,
		y = 0;

	// Initialize the grid
	for (; x < 1000; x++) {
		row = [];
		for (y = 0; y < 1000; y++) {
			row.push({
				"bool": false,
				"brightness": 0
			});
		}
		grid.push(row);
	}

	// Process Instructions
	input.forEach(function (instruction) {
		var match = instruction.match(re),
			data = {
				action: match[1],
				startX: Number.parseInt(match[2], 10),
				startY: Number.parseInt(match[3], 10),
				endX: Number.parseInt(match[4], 10),
				endY: Number.parseInt(match[5], 10)
			};

		for (x = data.startX; x <= data.endX; x++) {
			for (y = data.startY; y <= data.endY; y++) {
				// console.log(grid[x][y]);
				switch (data.action) {
					case "on":
						grid[x][y].bool = true;
						grid[x][y].brightness++;
						break;

					case "off":
						grid[x][y].bool = false;
						grid[x][y].brightness = Math.max(grid[x][y].brightness - 1, 0);
						break;

					case "toggle":
						grid[x][y].bool = !grid[x][y].bool;
						grid[x][y].brightness += 2;
						break;
				}
			}
		}
	});

	// Get answer
	for (x = 0; x < 1000; x++) {
		for (y = 0; y < 1000; y++) {
			if (grid[x][y].bool) {
				answer1++;
			}

			answer2 += grid[x][y].brightness;
		}
	}

	console.log("Answer #1:", answer1);
	console.log("Answer #2:", answer2);
})(input);
