/*
	Santa's Accounting-Elves need help balancing the books after a recent order.
	Unfortunately, their accounting software uses a peculiar storage format.
	That's where you come in.

	They have a JSON document which contains a variety of things: arrays
	([1,2,3]), objects ({"a":1, "b":2}), numbers, and strings. Your first job is
	to simply find all of the numbers throughout the document and add them
	together.

	For example:

	- [1,2,3] and {"a":2,"b":4} both have a sum of 6.
	- [[[3]]] and {"a":{"b":4},"c":-1} both have a sum of 3.
	- {"a":[-1,1]} and [-1,{"a":1}] both have a sum of 0.
	- [] and {} both have a sum of 0.

	You will not encounter any strings containing numbers.

	PART ONE:
	What is the sum of all numbers in the document?

	----

	Uh oh - the Accounting-Elves have realized that they double-counted
	everything red.

	Ignore any object (and all of its children) which has any property with
	the value "red". Do this only for objects ({...}), not arrays ([...]).

	- [1,2,3] still has a sum of 6.
	
	- [1,{"c":"red","b":2},3] now has a sum of 4, because the middle object is
	  ignored.
	
	- {"d":"red","e":[1,2,3,4],"f":5} now has a sum of 0, because the entire
	  structure is ignored.
	
	- [1,"red",5] has a sum of 6, because "red" in an array has no effect.

	PART TWO:
	What is the sum of all numbers in the document after applying these filters?
*/
;(function (advent) {
	var input = advent.getInput(12),
		assert = require("assert");

	function answer1 (str) {
		var numbers = str.match(/-?\d+/g),
			sum = (numbers !== null) ? numbers.reduce(function (prev, cur) {
				return prev + Number.parseInt(cur,10);
			}, 0) : 0;

		return sum;
	}

	function answer2 (str) {
		var obj = JSON.parse(str);

		function process (obj) {
			if (Array.isArray(obj)) {
				return obj.reduce(function (sum, cur) {
					return sum + process(cur);
				}, 0);
			} else if (typeof obj === "object") {
				if (Object.keys(obj).some(function (key) {
					return obj[key] === "red";
				})) {
					return 0;
				}

				return Object.keys(obj).reduce(function (sum, key) {
					return sum + process(obj[key]);
				}, 0);
			} else if (typeof obj === "number") {
				return obj;
			}
			return 0;
		}

		return process(obj);
	}

	// Run tests to confirm requirements have been met
	(function runTests () {
		assert.equal(answer1('[1,2,3]'), 6);
		assert.equal(answer1('{"a":2,"b":4}'), 6);
		assert.equal(answer1('[[[3]]]'), 3);
		assert.equal(answer1('{"a":{"b":4},"c":-1}'), 3);
		assert.equal(answer1('{"a":[-1,1]}'), 0);
		assert.equal(answer1('[-1,{"a":1}]'), 0);
		assert.equal(answer1('[]'), 0);
		assert.equal(answer1('{}'), 0);
		
		assert.equal(answer2('[1,2,3]'), 6);
		assert.equal(answer2('[1,{"c":"red","b":2},3]'), 4);
		assert.equal(answer2('{"d":"red","e":[1,2,3,4],"f":5}'), 0);
		assert.equal(answer2('[1,"red",5]'), 6);
	})();

	advent.displayResults(answer1(input), answer2(input));
})(require("./lib/advent.js"));