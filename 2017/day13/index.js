// http://adventofcode.com/2017/day/#
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const answer1 = (input) => {}
const answer2 = (input) => {}

// Run tests to confirm requirements have been met
advent.runTests([
	() => { assert.equal(true, true) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)