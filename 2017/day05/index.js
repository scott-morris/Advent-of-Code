// http://adventofcode.com/2017/day/5
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname).map(Number)
const assert = require("assert")

class Cpu {
	constructor (data) {
		this.cycles = 0
		this.pointer = 0
		this.data = [].concat(data)
	}

	cycle (type) {
		const pointer = this.pointer
		this.pointer += this.data[pointer]

		if (1 === type) {
			this.data[pointer]++
		} else {
			this.data[pointer] += ((this.data[pointer] >= 3) ? -1 : 1)
		}

		this.cycles++
	}

}

const answer1 = (input) => {
	const cpu = new Cpu(input)
	do {
		cpu.cycle(1)
	} while (cpu.pointer < cpu.data.length)

	return cpu.cycles
}
const answer2 = (input) => {
	const cpu = new Cpu(input)
	do {
		cpu.cycle(2)
	} while (cpu.pointer < cpu.data.length)

	return cpu.cycles
}

// Run tests to confirm requirements have been met
const testData_1 = [0, 3, 0, 1, -3]
const test1 = new Cpu(testData_1)
advent.runTests([
	() => {
		assert.equal(test1.cycles, 0)
		assert.equal(test1.pointer, 0)
		assert.equal(test1.data[0], 0)
	},
	() => {
		test1.cycle(1)
		assert.equal(test1.cycles, 1)
		assert.equal(test1.pointer, 0)
		assert.equal(test1.data[test1.pointer], 1)
	},
	() => {
		test1.cycle(1)
		assert.equal(test1.cycles, 2)
		assert.equal(test1.pointer, 1)
		assert.equal(test1.data[test1.pointer], 3)
	},
	() => {
		test1.cycle(1)
		assert.equal(test1.cycles, 3)
		assert.equal(test1.pointer, 4)
		assert.equal(test1.data[test1.pointer], -3)
	},
	() => {
		test1.cycle(1)
		assert.equal(test1.cycles, 4)
		assert.equal(test1.pointer, 1)
		assert.equal(test1.data[test1.pointer], 4)
	},
	() => { assert.equal(answer1(testData_1), 5) },
	() => { assert.equal(answer2(testData_1), 10) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)