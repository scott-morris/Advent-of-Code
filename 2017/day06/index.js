// http://adventofcode.com/2017/day/#
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

class Memory {
	constructor (input) {
		this.bank = input.split("\t").map(Number)
	}

	get maxBlocks () {
		return Math.max.apply(null, this.bank)
	}

	get startingIndex () {
		return this.bank.indexOf(this.maxBlocks)
	}

	get state () {
		return this.bank.join("-")
	}

	distribute () {
		// Start distribution
		let index = this.startingIndex
		let distribution = this.bank[index]

		this.bank[index] = 0
		index = (index + 1) % this.bank.length

		do {
			this.bank[index]++
			index = (index + 1) % this.bank.length
			distribution--
		} while (distribution > 0)
	}
}

const answer1 = (input) => {
	const memory = new Memory(input)
	const history = new Set()
	let cycles = 1

	history.add(memory.state)
	for (;;) {
		memory.distribute()

		if (history.has(memory.state)) {
			break
		}

		history.add(memory.state)
		cycles++
	}

	return cycles
}

const answer2 = (input) => {
	const memory = new Memory(input)
	const history = new Set()
	let cycles = 0

	history.add(memory.state)
	for (;;) {
		memory.distribute()
		cycles++

		if (history.has(memory.state)) {
			break
		}

		history.add(memory.state)
	}

	const loopStart = memory.state
	cycles = 0
	for (;;) {
		memory.distribute()
		cycles++

		if (memory.state === loopStart) {
			break
		}
	}

	return cycles
}

// Run tests to confirm requirements have been met
const test1 = new Memory("0	2	7	0")
advent.runTests([
	() => {
		assert.equal(test1.maxBlocks, 7)
		assert.equal(test1.startingIndex, 2)
	},
	() => {
		test1.distribute()
		assert.equal(test1.state, "2-4-1-2")
	},
	() => {
		test1.distribute()
		assert.equal(test1.state, "3-1-2-3")
	},
	() => {
		test1.distribute()
		assert.equal(test1.state, "0-2-3-4")
	},
	() => {
		test1.distribute()
		assert.equal(test1.state, "1-3-4-1")
	},
	() => {
		test1.distribute()
		assert.equal(test1.state, "2-4-1-2")
	},
	() => { assert.equal(answer1("0	2	7	0"), 5) },
	() => { assert.equal(answer2("0	2	7	0"), 4) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)