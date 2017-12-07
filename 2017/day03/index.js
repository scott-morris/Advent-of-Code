// http://adventofcode.com/2017/day/3
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const NORTH = [0, -1]
const SOUTH = [0, 1]
const WEST = [-1, 0]
const EAST = [1, 0]
const CARDINAL = [NORTH, EAST, SOUTH, WEST]

class Matrix {
	constructor () {
		this._x = 0
		this._y = 0
		this.key = 1
		this.direction = 1 // EAST
		this.data = {
			0: {
				0: 1
			}
		}
	}

	get onMyLeft() {
		const leftDirection = (this.direction + 3) % 4
		const leftCardinal = CARDINAL[leftDirection]
		return this.getData(
			(this._x + leftCardinal[0]),
			(this._y + leftCardinal[1])
		)
	}

	get coords() {
		return {
			x: this._x,
			y: this._y
		}
	}

	get activeData() {
		return this.getData(this._x, this._y)
	}

	getData (x, y) {
		if ("undefined" === typeof this.data[x]) {
			return 0
		}

		return this.data[x][y] || 0
	}

	calculateData () {
		if (this._x === 0 && this._y === 0) {
			return // already populated
		}

		let value =
			(this.getData((this._x + 1), (this._y - 1))) +
			(this.getData((this._x + 1), (this._y + 1))) +
			(this.getData((this._x + 1), (this._y))) +
			(this.getData((this._x - 1), (this._y - 1))) +
			(this.getData((this._x - 1), (this._y + 1))) +
			(this.getData((this._x - 1), (this._y))) +
			(this.getData((this._x), (this._y - 1))) +
			(this.getData((this._x), (this._y + 1)))

		if ("undefined" === typeof this.data[this._x]) {
			this.data[this._x] = {}
		}

		this.data[this._x][this._y] = value
	}

	step () {
		const direction = CARDINAL[this.direction]
		this.key++
		this._x += direction[0]
		this._y += direction[1]
		this.calculateData()
	}

	move (spaces = 1) {
		for (let i = 0; i < spaces; i++) {
			this.step()
		}
	}

	turnLeft () {
		this.direction = (this.direction + 3) % 4
	}
}

const walkMatrix = (destination) => {
	const matrix = new Matrix

	if (matrix.key >= destination) {
		return matrix
	}

	do {
		matrix.step()
		if (0 === matrix.onMyLeft) {
			matrix.turnLeft()
		}
	} while (matrix.key < destination)

	return matrix
}

const walkMatrixData = (givenValue) => {
	const targetValue = Number(givenValue)
	const matrix = new Matrix

	if (matrix.activeData >= targetValue) {
		return matrix.key
	}

	do {
		matrix.step()
		if (0 === matrix.onMyLeft) {
			matrix.turnLeft()
		}
	} while (matrix.activeData < targetValue)

	return {
		key: matrix.key,
		value: matrix.activeData
	}
}

const dataAt = (step) => {
	const matrix = walkMatrix(step)
	return matrix.activeData
}

const answer1 = (input) => {
	const matrix = walkMatrix(input)
	return Math.abs(matrix._x) + Math.abs(matrix._y)
}
const answer2 = (input) => {
	return walkMatrixData(input)
}

// Run tests to confirm requirements have been met
advent.runTests([
	() => { assert.equal(answer1(1), 0) },
	() => { assert.equal(answer1(12), 3) },
	() => { assert.equal(answer1(23), 2) },
	() => { assert.equal(answer1(1024), 31) },
	() => { assert.equal(dataAt(1), 1) },
	() => { assert.equal(dataAt(2), 1) },
	() => { assert.equal(dataAt(3), 2) },
	() => { assert.equal(dataAt(4), 4) },
	() => { assert.equal(dataAt(5), 5) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)