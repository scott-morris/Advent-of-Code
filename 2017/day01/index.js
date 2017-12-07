// http://adventofcode.com/2017/day/3
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const answer1 = (input) => input.split("").reduce((sum, char, index, array) => {
	return (index === input.length - 1) ?
		(char === input[0]) ? sum + Number(char) : sum :
		(char === input[index+1]) ? sum + Number(char) : sum;
}, 0);

const answer2 = (input) => {
	const firstHalf = input.split("");
	const secondHalf = firstHalf.splice(firstHalf.length/2);
	return firstHalf.reduce((sum, char, index) => {
		return (char === secondHalf[index]) ?
			sum + (Number(char) * 2) :
			sum;
	}, 0);
}

// Run tests to confirm requirements have been met
advent.runTests([
	() => { assert.equal(answer1("1122"), 3) },
	() => { assert.equal(answer1("1111"), 4) },
	() => { assert.equal(answer1("1234"), 0) },
	() => { assert.equal(answer1("91212129"), 9) },
	() => { assert.equal(answer2("1212"), 6) },
	() => { assert.equal(answer2("1221"), 0) },
	() => { assert.equal(answer2("123425"), 4) },
	() => { assert.equal(answer2("123123"), 12) },
	() => { assert.equal(answer2("12131415"), 4) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)