/*
	You're airdropped near Easter Bunny Headquarters in a city somewhere.
	"Near", unfortunately, is as close as you can get - the instructions on
	the Easter Bunny Recruiting Document the Elves intercepted start here,
	and nobody had time to work them out further.

	The Document indicates that you should start at the given coordinates
	(where you just landed) and face North. Then, follow the provided
	sequence: either turn left (L) or right (R) 90 degrees, then walk
	forward the given number of blocks, ending at a new intersection.

	There's no time to follow such ridiculous instructions on foot, though,
	so you take a moment and work out the destination. Given that you can
	only walk on the street grid of the city, how far is the shortest path
	to the destination?

	For example:

	- Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5
	  blocks away.
	- R2, R2, R2 leaves you 2 blocks due South of your starting position,
	  which is 2 blocks away.
	- R5, L5, R5, R3 leaves you 12 blocks away.

	PART ONE:
	How many blocks away is Easter Bunny HQ?

	PART TWO:
	Then, you notice the instructions continue on the back of the Recruiting
	Document. Easter Bunny HQ is actually at the first location you visit
	twice.

	For example, if your instructions are R8, R4, R4, R8, the first location
	you visit twice is 4 blocks away, due East.

	How many blocks away is the first location you visit twice?
*/
"use strict"

const advent = require("./lib/advent.js")
const input = advent.getInput(1)
const assert = require("assert")

const cardinals = {
	"N": { "R": "E", "L": "W" },
	"E": { "R": "S", "L": "N" },
	"S": { "R": "W", "L": "E" },
	"W": { "R": "N", "L": "S" }
}

class Walker {
	constructor (instructions) {
		this.cardinal = "N"
		this.x = 0
		this.y = 0
		this.visited = new Set()
		this.dupes = []

		if (instructions) {
			this.walkGrid(instructions)
		}
	}

	walk (steps) {
		let coords

		for (let i = 0; i < steps; i++) {
			switch (this.cardinal) {
				case "N": this.x++; break
				case "E": this.y++; break
				case "S": this.x--; break
				case "W": this.y--; break
			}

			// Keep track of blocks visited
			coords = `${this.x},${this.y}`

			if (this.visited.has(coords)) {
				this.dupes.push(coords)
			}

			this.visited.add(coords)
		}
	}

	turn (direction) {
		this.cardinal = cardinals[this.cardinal][direction]
	}

	walkGrid (instructions) {
		const instructionList = instructions.split(", ")
		let _this = this

		instructionList.forEach(function (instr) {
			const instrParse = instr.match(/([RL])(\d+)/)
			const turnDirection = instrParse[1]
			const goSteps = Number.parseInt(instrParse[2], 10)

			_this.turn(turnDirection)
			_this.walk(goSteps)
		})
	}
}

const answer1 = (walker) => Math.abs(walker.x) + Math.abs(walker.y)

const answer2 = (walker) => {
	const firstDupe = walker.dupes[0]
	const coords = firstDupe.split(",")
	return Math.abs(coords[0]) + Math.abs(coords[1])
}

// Run tests to confirm requirements have been met
const runTests = () => {
	let test1 = new Walker("R2, L3")
	let test2 = new Walker("R2, R2, R2")
	let test3 = new Walker("R5, L5, R5, R3")

	assert.equal(answer1(test1), 5)
	assert.equal(answer1(test2), 2)
	assert.equal(answer1(test3), 12)

	let test4 = new Walker("R8, R4, R4, R8")
	assert.equal(answer2(test4), 4)
}

runTests()
let walker = new Walker(input)
advent.displayResults(answer1(walker), answer2(walker))