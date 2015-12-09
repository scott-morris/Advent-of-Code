/*
	Santa is delivering presents to an infinite two-dimensional grid of houses.

	He begins by delivering a present to the house at his starting location, and then
	an elf at the North Pole calls him via radio and tells him where to move next.
	Moves are always exactly one house to the north (^), south (v), east (>), or west
	(<). After each move, he delivers another present to the house at his new location.

	However, the elf back at the north pole has had a little too much eggnog, and so his
	directions are a little off, and Santa ends up visiting some houses more than once.

	PART ONE:
	How many houses receive at least one present?

	----

	The next year, to speed up the process, Santa creates a robot version of himself,
	Robo-Santa, to deliver presents with him.

	Santa and Robo-Santa start at the same location (delivering two presents to the same
	starting house), then take turns moving based on instructions from the elf, who is
	eggnoggedly reading from the same script as the previous year.

	PART TWO:
	This year, how many houses receive at least one present?
*/
var fs = require("fs"),
	input = fs.readFileSync("./inputs/advent_03.txt", "utf8");

;(function (input) {
	var answer1,
		answer2,
		x = 0,
		y = 0,
		sx = 0,
		sy = 0,
		rx = 0,
		ry = 0,
		nodes = {},
		nodes2 = {},
		steps = input.split("");

	steps.forEach(function (direction, idx) {
		var nodeId = "",
			roboNodeId = "",
			isSanta = (idx % 2 === 0);

		switch (direction) {
			case "^":
				y++;
				if (isSanta) { sy++; } else { ry++; }
				break;

			case "v":
				y--;
				if (isSanta) { sy--; } else { ry--; }
				break;

			case "<":
				x--;
				if (isSanta) { sx--; } else { rx--; }
				break;

			case ">":
				x++;
				if (isSanta) { sx++; } else { rx++; }
				break;
		}

		nodeId = x + "_" + y;
		if (nodes.hasOwnProperty(nodeId)) {
			nodes[nodeId]++;
		} else {
			nodes[nodeId] = 0;
		}

		roboNodeId = (isSanta) ? sx + "_" + sy : rx + "_" + ry;
		if (nodes2.hasOwnProperty(roboNodeId)) {
			nodes2[roboNodeId]++;
		} else {
			nodes2[roboNodeId] = 0;
		}
	});

	answer1 = Object.keys(nodes).length;
	answer2 = Object.keys(nodes2).length;

	console.log("# keys - Step #1:", answer1);
	console.log("# keys - Step #2:", answer2);
})(input);