// http://adventofcode.com/2016/day/15
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

class Disc {
	constructor (spec) {
		let info = /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\./.exec(spec)
		this.offset = parseInt(info[1],10)
		this.numPositions = parseInt(info[2],10)
		this.startingPosition = parseInt(info[3],10)
	}

	position (time) {
		return (this.startingPosition + time) % this.numPositions
	}

	passThru (time) {
		return (this.position(time) === 0)
	}

	passThruAtDrop (time) {
		return this.passThru(time + this.offset)
	}
}

class Machine {
	constructor (specs) {
		this.discs = specs.map(spec=>new Disc(spec))
	}

	drop (time) {
		for (let i=0; i<this.discs.length; i++) {
			if (!this.discs[i].passThruAtDrop(time)) {
				return `failed at disc ${this.discs[i].offset}`
			}
		}

		return `success`
	}
}

const answer1 = (input) => {
	let time = 0
	let machine = new Machine(input)
	while (machine.drop(time) !== "success") {
		time++
	}
	return time
}
const answer2 = (input) => {
	let newDiscOffset = input.length+1
	input.push(`Disc #${newDiscOffset} has 11 positions; at time=0, it is at position 0.`)

	return answer1(input)
}

// Run tests to confirm requirements have been met
let testMachine = new Machine([
    "Disc #1 has 5 positions; at time=0, it is at position 4.",
    "Disc #2 has 2 positions; at time=0, it is at position 1."
])
advent.runTests([
	() => { assert.equal(testMachine.drop(0), "failed at disc 2") },
	() => { assert.equal(testMachine.drop(5), "success") }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)