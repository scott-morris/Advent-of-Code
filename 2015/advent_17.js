/*
	The elves bought too much eggnog again - 150 liters this time. To fit it all
	into your refrigerator, you'll need to move it into smaller containers. You
	take an inventory of the capacities of the available containers.

	For example, suppose you have containers of size 20, 15, 10, 5, and 5 liters.
	If you need to store 25 liters, there are four ways to do it:

	- 15 and 10
	- 20 and 5 (the first 5)
	- 20 and 5 (the second 5)
	- 15, 5, and 5

	PART ONE:
	Filling all containers entirely, how many different combinations of containers
	can exactly fit all 150 liters of eggnog?

	----

	While playing with all the containers in the kitchen, another load of eggnog
	arrives! The shipping and receiving department is requesting as many
	containers as you can spare.

	Find the minimum number of containers that can exactly fit all 150 liters of
	eggnog. How many different ways can you fill that number of containers and
	still hold exactly 150 litres?

	PART TWO:
	In the example above, the minimum number of containers was two. There were
	three ways to use that many containers, and so the answer there would be 3.
*/
;(function (advent) {
	var input = advent.getInputArray(17).map(function (val) {
			return parseInt(val, 10);
		}),
		assert = require("assert");

	function numCombinations (containers, total) {
		var numMatches = 0,
			numCombinations = Math.pow(2, containers.length),
			powersOfTwo = [],
			i, j, sum;

		for (i = 0; i < containers.length; i++) {
			powersOfTwo.push(Math.pow(2, i));
		}

		for (i = 0; i <= numCombinations; i++) {
			sum = powersOfTwo.reduce(function (prevVal, mask, index) {
				return (mask & i) ? (prevVal + containers[index]) : prevVal;
			}, 0);

			if (sum === total) {
				numMatches++;
			}
		}

		return numMatches;
	}

	function numCombinationsGrouped (containers, total) {
		var matches = {},
			numCombinations = Math.pow(2, containers.length),
			combo = [],
			powersOfTwo = [],
			arrSize,
			i, j, sum;

		for (i = 0; i < containers.length; i++) {
			powersOfTwo.push(Math.pow(2, i));
		}

		for (i = 0; i <= numCombinations; i++) {
			combo = powersOfTwo.map(function (mask, index) {
				return (mask & i) ? containers[index] : false;
			}).filter(function (val) {
				return (val !== false);
			});


			sum = combo.reduce(function (prevVal, val) {
				return prevVal + val;
			}, 0);

			if (sum === total) {
				arrSize = combo.length;

				if (!matches.hasOwnProperty(arrSize)) {
					matches[arrSize] = 0;
				}

				matches[arrSize]++;
			}
		}

		return matches;
	}

	function answer1 () {
		return numCombinations(input, 150);
	}

	function answer2 () {
		return numCombinationsGrouped(input, 150);
	}

	// Run tests to confirm requirements have been met
	(function runTests () {
		assert.equal(numCombinations([20, 15, 10, 5, 5], 25), 4);
	})();

	advent.displayResults(answer1(), answer2());
})(require("./lib/advent.js"));