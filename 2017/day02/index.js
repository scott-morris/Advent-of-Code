// http://adventofcode.com/2017/day/2
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const getRowData = (row) => row.split("\t").map(Number)

const checksumRow = (row) => {
	const rowData = getRowData(row)
	return Math.max.apply(null, rowData) - Math.min.apply(null, rowData);
}

const isEvenlyDivisible = (num1, num2) => {
	const smaller = Math.min(num1, num2)
	const larger = Math.max(num1, num2)
	return (larger % smaller > 0) ? 0 : larger / smaller
}

const divisibleChecksumRow = (row) => {
	const rowData = getRowData(row)
	const result = rowData.map((item, index, array) => {
		const canMatch = array.slice(index + 1).map((nextItem) => {
			return isEvenlyDivisible(item, nextItem)
		})
		return canMatch.reduce((sum, item) => sum + item, 0)
	})
	return result.reduce((sum, item) => sum + item, 0)
}

const answer1 = (input) => {
	return input.reduce((sum, row) => {
		return sum + checksumRow(row)
	}, 0)
}
const answer2 = (input) => {
	return input.reduce((sum, row) => {
		return sum + divisibleChecksumRow(row)
	}, 0)
}

// Run tests to confirm requirements have been met
const testData_pt1 = [
	"5	1	9	5",
	"7	5	3",
	"2	4	6 	8"
]

const testData_pt2 = [
	"5	9	2	8",
	"9	4	7	3",
	"3	8	6	5"
]

advent.runTests([
	() => { assert.equal(checksumRow(testData_pt1[0]), 8) },
	() => { assert.equal(checksumRow(testData_pt1[1]), 4) },
	() => { assert.equal(checksumRow(testData_pt1[2]), 6) },
	() => { assert.equal(answer1(testData_pt1), 18) },
	() => { assert.equal(isEvenlyDivisible(5, 9), 0) },
	() => { assert.equal(isEvenlyDivisible(8, 2), 4) },
	() => { assert.equal(isEvenlyDivisible(2, 8), 4) },
	() => { assert.equal(isEvenlyDivisible(3, 9), 3) },
	() => { assert.equal(isEvenlyDivisible(9, 3), 3) },
	() => { assert.equal(divisibleChecksumRow(testData_pt2[0]), 4) },
	() => { assert.equal(divisibleChecksumRow(testData_pt2[1]), 3) },
	() => { assert.equal(divisibleChecksumRow(testData_pt2[2]), 2) },
	() => { assert.equal(answer2(testData_pt2), 9) },
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)