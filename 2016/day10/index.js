// http://adventofcode.com/2016/day/10
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const regEx = {
	robot: /^bot (\d+) gives low to (\w \d+) and high to (\w \d+)$/,
	instruction: /^value (\d+) goes to bot (\d+)$/
}

class Robot {
	constructor (low, high) {
		this.low = low
		this.high = high
		this.chips = []
	}

	addChip (chip) {
		this.chips.push(chip)
	}
}

const defineRobots = (input) => {
	let robots = []
	let id, low, high

	input.forEach(def => {
		let robotInfo = regEx.robot.exec(def)
		if (robotInfo !== null) {
			id = parseInt(robotInfo[1], 10)
			low = robotInfo[2]
			high = robotInfo[3]
			robots[id] = new Robot(low, high)
		}
	})

	return robots
}

const answer1 = (input) => {}
const answer2 = (input) => {}

// Run tests to confirm requirements have been met
advent.runTests([
	() => { assert.equal(true, true) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)