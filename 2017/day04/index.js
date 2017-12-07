// http://adventofcode.com/2017/day/4
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const isValidPassphrase = (phrase) => {
	return !phrase.match(/(\b\w+\b).*(\b\1\b)/)
}

const isValidSecurePassphrase = (phrase) => {
	const alphabetized = phrase.split(" ")
		.map(item => item.split("").sort().join(""))
		.join(" ")

	return isValidPassphrase(alphabetized)
}

const answer1 = (input) => {
	return input.filter(isValidPassphrase).length
}
const answer2 = (input) => {
	return input.filter(isValidSecurePassphrase).length
}

// Run tests to confirm requirements have been met
advent.runTests([
	() => { assert.equal(isValidPassphrase("aa bb cc dd ee"), true) },
	() => { assert.equal(isValidPassphrase("aa bb cc dd aa"), false) },
	() => { assert.equal(isValidPassphrase("aa bb cc dd aaa"), true) },
	() => { assert.equal(isValidSecurePassphrase("abcde fghij"), true) },
	() => { assert.equal(isValidSecurePassphrase("abcde xyz ecdab"), false) },
	() => { assert.equal(isValidSecurePassphrase("a ab abc abd abf abj"), true) },
	() => { assert.equal(isValidSecurePassphrase("iiii oiii ooii oooi oooo"), true) },
	() => { assert.equal(isValidSecurePassphrase("oiii ioii iioi iiio"), false) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)