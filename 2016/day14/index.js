// http://adventofcode.com/2016/day/14
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")
const md5 = require("js-md5")

const nextHashWithTriplet = (str, startWith) => {
    let index = startWith || -1
    let hash
    let match = null
    while (match === null) {
        index++
        hash = md5(str + index)
        match = hash.match(/([a-f0-9])\1{2}/)
    }

    return {
    	hash,
    	index,
    	match: match[1],
    	isQuintet: /([a-f0-9])\1{4}/.test(hash)
    }
}

const nextKey = (str, startWith, hashes) => {
	let index = startWith || 0
	let nextHash
	let found = false

	hashes = hashes || {}

	while (!found && index < 1000000) {
		nextHash = nextHashWithTriplet(str,index)
		index = nextHash.index

		if (hashes.hasOwnProperty(nextHash.match)) {
			if (nextHash.isQuintet && hashes[nextHash.match].indexes.some(index=>index>=(nextHash.index-1000))) {
				found = hashes[nextHash.match]
			}
			hashes[nextHash.match].indexes.push(nextHash.index)
		} else {
			hashes[nextHash.match] = {
				hash: nextHash.hash,
				indexes: [nextHash.index]
			}
		}
	}

	return { found, index, hashes }
}

const answer1 = (input) => {}
const answer2 = (input) => {}

// Run tests to confirm requirements have been met
advent.runTests([
	() => {
		let testCase = nextHashWithTriplet("abc")
		assert.equal(testCase.index, 18)
		assert.equal(testCase.match, "8")
	},
	() => {
		let testCase = nextHashWithTriplet("abc",18)
		assert.equal(testCase.index, 39)
		assert.equal(testCase.match, "e")
	},
	() => {
		let testCase = nextKey("abc")
		advent.log("[testCase]:", testCase);
		assert.equal(testCase.index, 39)
		assert.equal(testCase.match, "e")
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)