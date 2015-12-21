/*
	Every year, Santa manages to deliver all of his presents in a single night.

	This year, however, he has some new locations to visit; his elves have
	provided him the distances between every pair of locations. He can start and
	end at any two (different) locations he wants, but he must visit each location
	exactly once. What is the shortest distance he can travel to achieve this?

	For example, given the following distances:

	- London to Dublin = 464
	- London to Belfast = 518
	- Dublin to Belfast = 141

	The possible routes are therefore:

	- Dublin -> London -> Belfast = 982
	- London -> Dublin -> Belfast = 605
	- London -> Belfast -> Dublin = 659
	- Dublin -> Belfast -> London = 659
	- Belfast -> Dublin -> London = 605
	- Belfast -> London -> Dublin = 982

	The shortest of these is London -> Dublin -> Belfast = 605, and so the answer
	is 605 in this example.

	PART ONE:
	What is the distance of the shortest route?

	PART TWO:
	TBD
*/
;(function (advent) {
	var input = advent.getInputArray(9),
		tsp = require("./lib/tsp.js"),
		assert = require("assert"),
		map = {};

	// Builds a 2-level object with corresponding distances between two points
	// var distanceBetween = map["src"]["dest"];
	function buildMap (input) {
		input.forEach(function (mapDef) {
			var mapInfo = mapDef.match(/(\w+) to (\w+) = (\d+)/i);
				src = mapInfo[1],
				dest = mapInfo[2],
				dist = parseInt(mapInfo[3], 10);

			if (!map.hasOwnProperty(src))  { map[src]  = {}; };
			if (!map.hasOwnProperty(dest)) { map[dest] = {}; };

			map[src][dest] = dist;
			map[dest][src] = dist;
		});
	}

	function answer1 (str) {

	}

	function answer2 (str) {

	}

	buildMap(input);
	console.log(map);

	// Run tests to confirm requirements have been met
	(function runTests () {
		assert.equal(true, true);
	})();

	advent.displayResults(answer1(str), answer2(str));
})(require("./lib/advent.js"));