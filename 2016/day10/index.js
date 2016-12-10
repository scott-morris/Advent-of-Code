// http://adventofcode.com/2016/day/10
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const regEx = {
	robot: /^bot (\d+) gives low to (\w+ \d+) and high to (\w+ \d+)$/,
	instruction: /^value (\d+) goes to (\w+ \d+)$/,
	spec: /^(\w+) (\d+)$/
}

const getSpecInfo = (spec) => {
	let specInfo = regEx.spec.exec(spec)
	return {
		type: specInfo[1],
		id: parseInt(specInfo[2],10)
	}
}

class Robot {
	constructor (id, low, high) {
		this.id = id

		this.low = (low) ? getSpecInfo(low) : undefined
		this.high = (high) ? getSpecInfo(high) : undefined
		this.chips = []
	}

	addChip (chip) {
		this.chips.push(chip)
		this.chips = this.chips.sort((a,b) => a-b)
		console.log("[this.chips]:", this.chips);
	}

	get readyToAct () {
		return (this.low !== undefined && this.high !== undefined && this.chips.length === 2)
	}
}

class RobotGroup {
	constructor (instructions) {
		this.stepCount = 0
		this.outputs = []
		this.log = []

		let robots = this.robots = []
		let value, spec
		let id, low, high
		let robotInfo, instructionInfo

		instructions.forEach(def => {
			if (regEx.robot.test(def)) {
				robotInfo = regEx.robot.exec(def)
				id = parseInt(robotInfo[1], 10)
				low = robotInfo[2]
				high = robotInfo[3]
				if (robots[id]) {
					robots[id].low = getSpecInfo(low)
					robots[id].high = getSpecInfo(high)
					if (robots[id].readyToAct) {
						this.processRobot(id)
					}
				} else {
					robots[id] = new Robot(id, low, high)
				}
			} else if (regEx.instruction.test(def)) {
				instructionInfo = regEx.instruction.exec(def)
				value = parseInt(instructionInfo[1], 10)
				spec = getSpecInfo(instructionInfo[2])
				this.give(spec.type, spec.id, value)
			} else {
				throw new Error(`"${def}" is not a valid instruction`)
			}
		})
	}

	giveToRobot (id, value) {
		this.robots[id] = this.robots[id] || new Robot(id)
		this.robots[id].addChip(value)
		if (this.robots[id].readyToAct) {
			this.processRobot(id)
		}
	}

	giveToOutput (id, value) {
		this.outputs[id] = value
	}

	give (type, id, value) {
		if (type === "bot") {
			this.giveToRobot(id, value)
		} else {
			this.giveToOutput(id, value)
		}
	}

	processRobot (id) {
		this.stepCount++

		let robot = this.robots[id]
		let stepDetails = {
			id: id,
			lowValue: robot.chips[0],
			highValue: robot.chips[1],
			lowType: robot.low.type,
			lowID: robot.low.id,
			highType: robot.high.type,
			highID: robot.high.id
		}

		this.give(stepDetails.lowType, stepDetails.lowID, stepDetails.lowValue)
		this.give(stepDetails.highType, stepDetails.highID, stepDetails.highValue)

		this.log.push(stepDetails)
		robot.chips = []
	}
}

const answer1 = (input) => {
	let robotGroup = new RobotGroup(input)
	let search = robotGroup.log.filter(log => {
		return (log.lowValue === 17 && log.highValue === 61)
	})
	return search
}
const answer2 = (input) => {
	let robotGroup = new RobotGroup(input)
	return (robotGroup.outputs[0] * robotGroup.outputs[1] * robotGroup.outputs[2])
}

// Run tests to confirm requirements have been met
const testInstructions = [
	"value 5 goes to bot 2",
	"bot 2 gives low to bot 1 and high to bot 0",
	"value 3 goes to bot 1",
	"bot 1 gives low to output 1 and high to bot 0",
	"bot 0 gives low to output 2 and high to output 0",
	"value 2 goes to bot 2"
]
advent.runTests([
	// PART ONE
	() => {
		let testRobotGroup = new RobotGroup(testInstructions)

		assert.deepEqual(testRobotGroup.robots[0].chips, [], `Robots 0 contains [${testRobotGroup.robots[0].chips}], expected []`)
		assert.deepEqual(testRobotGroup.robots[1].chips, [], `Robots 1 contains [${testRobotGroup.robots[1].chips}], expected []`)
		assert.deepEqual(testRobotGroup.robots[2].chips, [], `Robots 2 contains [${testRobotGroup.robots[2].chips}], expected []`)

		assert.deepEqual(testRobotGroup.outputs[0], 5)
		assert.deepEqual(testRobotGroup.outputs[1], 2)
		assert.deepEqual(testRobotGroup.outputs[2], 3)
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)