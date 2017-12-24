// http://adventofcode.com/2017/day/#
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

class Memory {
	constructor () {
		this.storage = {}
		this.largestHistoricalValue = -Infinity
	}

	_parseInput (line) {
		const inputRegEx = /^([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) ([<>!=]+) (-?\d+)$/i;
		const [
			fullMatch,
			register,
			operation,
			amount,
			ifRegister,
			ifOperation,
			ifAmount
		] = inputRegEx.exec(line);

		return {
			register,
			operation,
			amount: Number(amount),
			ifRegister,
			ifOperation,
			ifAmount: Number(ifAmount)
		}
	}

	checkValidity (register, operation, amount) {
		const value = this.getRegister(register)

		switch (operation) {
			case ">": return value > amount
			case "<": return value < amount
			case ">=": return value >= amount
			case "<=": return value <= amount
			case "==": return value == amount
			case "!=": return value != amount
		}
	}

	updateRegister (register, operation, amount) {
		const previousValue = this.getRegister(register)

		this.storage[register] = ("inc" === operation) ?
			previousValue + amount :
			previousValue - amount

		this.largestHistoricalValue = Math.max(this.largestHistoricalValue, this.storage[register])
	}

	processInstruction (instruction) {
		const op = this._parseInput(instruction)

		if (this.checkValidity(op.ifRegister, op.ifOperation, op.ifAmount)) {
			this.updateRegister(op.register, op.operation, op.amount)
		}
	}

	getRegister (key) {
		return this.storage[key] || 0
	}

	get largestValue () {
		return Object.keys(this.storage).reduce((maxSoFar, key) => Math.max(maxSoFar, this.storage[key]), -Infinity)
	}
}


const answer1 = (input) => {
	const memory = new Memory()
	input.forEach(inputLine => {
		memory.processInstruction(inputLine)
	})
	return memory.largestValue
}

const answer2 = (input) => {
	const memory = new Memory()
	input.forEach(inputLine => {
		memory.processInstruction(inputLine)
	})
	return memory.largestHistoricalValue
}

// Run tests to confirm requirements have been met
const testStep1 = new Memory()
const testData1 = [
	"b inc 5 if a > 1",
	"a inc 1 if b < 5",
	"c dec -10 if a >= 1",
	"c inc -20 if c == 10"
]
advent.runTests([
	() => {
		testStep1.processInstruction(testData1[0])

		assert.equal(testStep1.getRegister("a"), 0)
		assert.equal(testStep1.getRegister("b"), 0)
	},
	() => {
		testStep1.processInstruction(testData1[1])
		assert.equal(testStep1.getRegister("a"), 1)
	},
	() => {
		testStep1.processInstruction(testData1[2])
		assert.equal(testStep1.getRegister("c"), 10)
	},
	() => {
		testStep1.processInstruction(testData1[3])
		assert.equal(testStep1.getRegister("c"), -10)
	},
	() => { assert.equal(testStep1.largestValue, 1) },
	() => { assert.equal(testStep1.largestHistoricalValue, 10) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)