// http://adventofcode.com/2016/day/12
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

class Computer {
	constructor (instructions) {
		this.registers = { "a": 0, "b": 0, "c": 0, "d": 0 }
		this.pointer = 0
		this.instructions = instructions || []
	}

	// Can accept a numberic value or a register
	registerValue (val) {
		return (isNaN(val)) ? this.registers[val] : parseInt(val,10)
	}

	increment (register) { this.registers[register]++ }
	decrement (register) { this.registers[register]-- }
	copy (x, y) {
		this.registers[y] = this.registerValue(x)
	}
	jumpNotZero (x, y) {
		this.pointer += (this.registerValue(x) !== 0) ? parseInt(y, 10) : 1
	}

	run () {
		const regEx = {
			cmd: /^(\w+)/,
			cpy: /^cpy ([a-d\d]+) ([a-d])$/,
			inc: /^inc ([a-d])$/,
			dec: /^dec ([a-d])$/,
			jnz: /^jnz ([a-d\d]+) (-?\d+)$/
		}
		this.pointer = 0
		let cmd, parse, x, y

		while (this.pointer < this.instructions.length) {
			cmd = this.instructions[this.pointer].match(regEx.cmd)[0]
			parse = this.instructions[this.pointer].match(regEx[cmd])

			switch (cmd) {
				case "cpy":
					this.copy(parse[1], parse[2])
					this.pointer++
					break

				case "inc":
					this.increment(parse[1])
					this.pointer++
					break

				case "dec":
					this.decrement(parse[1])
					this.pointer++
					break

				case "jnz":
					this.jumpNotZero(parse[1], parse[2])
					break
			}
		}
	}
}

const answer1 = (input) => {
	let computer = new Computer(input)
	computer.run()
	return computer.registers.a
}
const answer2 = (input) => {
	let computer = new Computer(input)
	computer.registers.c = 1
	computer.run()
	return computer.registers.a
}

// Run tests to confirm requirements have been met
const testData = [
	"cpy 41 a",
	"inc a",
	"inc a",
	"dec a",
	"jnz a 2",
	"dec a"
]
advent.runTests([
	() => {
		let testMachine = new Computer(testData)
		testMachine.run()

		assert.equal(testMachine.registers.a, 42)
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)