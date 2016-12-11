// http://adventofcode.com/2016/day/${1:day}
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const ordinal = {
	"first": 1,
	"second": 2,
	"third": 3,
	"fourth": 4
}

const regEx = {
	level: /^The (\w+) floor/,
	microchip: /(\w+)-compatible microchip/g,
	generator: /(\w+) generator/g
}

class Floor {
	constructor (def) {
		this.level = ordinal[regEx.level.exec(def)[1]]
		this.generators = regEx.generator.test(def) ? def.match(regEx.generator).map(g => g.split(" ")[0]) : []
		this.microchips = regEx.microchip.test(def) ? def.match(regEx.microchip).map(m => m.split("-")[0]) : []
	}

	get friedChips () {
		// if a chip is ever left in the same area as another RTG, and it's
		// not connected to its own RTG, the chip will be fried

	}
}

// Extend Floor because, similarly, it has a floor #, generators, and
// microchips and follows the same base rules about what it can and cannot
// have together
class Elevator extends Floor {

}

class Building {
	constructor (input) {
		this.floors = []
		input.forEach(spec => {
			let floor = new Floor(spec)
			this.floors[floor.level-1] = floor
		})
	}
}

const answer1 = (input) => {}
const answer2 = (input) => {}

// Run tests to confirm requirements have been met
const testData = [
	"The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.",
	"The second floor contains a hydrogen generator.",
	"The third floor contains a lithium generator.",
	"The fourth floor contains nothing relevant."
]
advent.runTests([
	() => {
		let testBuilding = new Building(testData)

		// Test the constructors
		assert.deepEqual(testBuilding.floors[0].generators, [])
		assert.deepEqual(testBuilding.floors[0].microchips, ["hydrogen","lithium"])
		assert.deepEqual(testBuilding.floors[1].generators, ["hydrogen"])
		assert.deepEqual(testBuilding.floors[1].microchips, [])
		assert.deepEqual(testBuilding.floors[2].generators, ["lithium"])
		assert.deepEqual(testBuilding.floors[2].microchips, [])
		assert.deepEqual(testBuilding.floors[3].generators, [])
		assert.deepEqual(testBuilding.floors[3].microchips, [])
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)