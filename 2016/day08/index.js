// http://adventofcode.com/2016/day/8
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const GRID_OFF = "."
const GRID_ON = "#"

class Grid {
	constructor (width, height, fill) {
		fill = fill || "."
		this.contents = []

		for (let row=0; row<height; row++) {
			this.contents[row] = []
			for (let col=0; col<width; col++) {
				this.contents[row][col] = GRID_OFF
			}
		}
	}

	transpose () {
		let copy = []
		let newWidth = this.contents.length
		let newHeight = this.contents[0].length

		for (let row=0; row<newHeight; row++) {
			copy[row] = []
			for (let col=0; col<newWidth; col++) {
				copy[row][col] = this.contents[col][row]
			}
		}

		this.contents = copy
	}

	get output () {
		return this.contents.map(row => row.join("")).join("\n")
	}

	get numOn () {
		return this.contents.reduce((count,row)=>{ return count += row.reduce((colCount,col)=>{ return (col === GRID_ON) ? ++colCount: colCount},0)},0)
	}
}

class Screen extends Grid {
	rect (width, height) {
		for (let row=0; row<height; row++) {
			if (this.contents[row]) {
				for (let col=0; col<width; col++) {
					if (this.contents[row][col]) {
						this.contents[row][col] = GRID_ON
					}
				}
			}
		}
	}

	rotateRow (rowIndex, amount) {
		let copy = []
		let row = this.contents[rowIndex]
		let col
		for (col=row.length-amount; col<row.length; col++) {
			copy.push(row[col])
		}
		for (col = 0; col<row.length-amount; col++) {
			copy.push(row[col])
		}
		this.contents[rowIndex] = copy
	}

	rotateColumn (col, amount) {
		this.transpose()
		this.rotateRow(col, amount)
		this.transpose()
	}

	processInstruction (instr) {
		const regEx = {
			rect: /rect (\d+)x(\d+)/,
			row: /rotate row y=(\d+) by (\d+)/,
			col: /rotate column x=(\d+) by (\d+)/
		}
		let params

		if (regEx.rect.test(instr)) {
			params = instr.match(regEx.rect)
			this.rect(parseInt(params[1],10), parseInt(params[2],10))
		} else if (regEx.row.test(instr)) {
			params = instr.match(regEx.row)
			this.rotateRow(parseInt(params[1],10), parseInt(params[2],10))
		} else if (regEx.col.test(instr)) {
			params = instr.match(regEx.col)
			this.rotateColumn(parseInt(params[1],10), parseInt(params[2],10))
		} else {
			throw new Error(`"${instr}" does not match any RegEx`)
		}
	}
}

const answer1 = (input) => {
	const answerGrid = new Screen(50,6)
	input.forEach(instr => answerGrid.processInstruction(instr))

	return answerGrid.numOn
}
const answer2 = (input) => {
	const answerGrid = new Screen(50,6)
	input.forEach(instr => answerGrid.processInstruction(instr))

	console.log()
	console.log(answerGrid.output)
}

// Run tests to confirm requirements have been met
const testGrid = new Screen(7,3)
advent.runTests([
	() => {
		assert.equal(testGrid.output,
			".......\n"+
			".......\n"+
			".......")
		assert.equal(testGrid.numOn, 0)
	},
	() => {
		testGrid.processInstruction("rect 3x2")
		assert.equal(testGrid.output,
			"###....\n"+
			"###....\n"+
			".......")
	},
	() => {
		testGrid.processInstruction("rotate column x=1 by 1")
		assert.equal(testGrid.output,
			"#.#....\n"+
			"###....\n"+
			".#.....")
	},
	() => {
		testGrid.processInstruction("rotate row y=0 by 4")
		assert.equal(testGrid.output,
			"....#.#\n"+
			"###....\n"+
			".#.....")
	},
	() => {
		testGrid.processInstruction("rotate column x=1 by 1")
		assert.equal(testGrid.output,
			".#..#.#\n"+
			"#.#....\n"+
			".#.....")
	},
	() => {
		assert.equal(testGrid.numOn, 6)
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)