/*
Problem description

Now that you can think clearly, you move deeper into the labyrinth of hallways
and office furniture that makes up this part of Easter Bunny HQ. This must be
a graphic design department; the walls are covered in specifications for
triangles.

Or are they?

The design document gives the side lengths of each triangle it describes,
but... 5 10 25? Some of these aren't triangles. You can't help but mark the
impossible ones.

In a valid triangle, the sum of any two sides must be larger than the
remaining side. For example, the "triangle" given above is impossible, because
5 + 10 is not larger than 25.

PART ONE:
In your puzzle input, how many of the listed triangles are possible?


PART TWO:
Now that you've helpfully marked up their design documents, it occurs to you
that triangles are specified in groups of three vertically. Each set of three
numbers in a column specifies a triangle. Rows are unrelated.

For example, given the following specification, numbers with the same hundreds
digit would be part of the same triangle:

	101 301 501
	102 302 502
	103 303 503
	201 401 601
	202 402 602
	203 403 603

In your puzzle input, and instead reading by columns, how many of the listed
triangles are possible?
*/
"use strict"

const advent = require("./lib/advent.js")
const input = advent.getInput(3)
const assert = require("assert")

const parseLine = (line) => {
	let sides = line.match(/^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/)
	sides.shift() // get rid of the full match
	return sides
}

const isPossibleTriangle = (sides) => {
	let sideTotal = sides.reduce((total, side) => { return total += parseInt(side,10) }, 0)
	let maxSide = Math.max.apply(null, sides)

	return ((sideTotal - maxSide) > maxSide)
}

const answer1 = (input) => {
	let possibleTriangles = input.filter(spec => { return isPossibleTriangle(parseLine(spec)) })
	return possibleTriangles.length
}
const answer2 = (input) => {
	let i = 0
	let newSpec = []
	do {
		let grid = [
			parseLine(input[i]),
			parseLine(input[i+1]),
			parseLine(input[i+2])
		]
		for (let x=0; x<3; x++) {
			let row = []
			for (let y=0; y<3; y++) {
				row.push(grid[y][x])
			}
			newSpec.push(row)
		}
		i += 3
	} while (i < input.length)

	let possibleTriangles = newSpec.filter(spec => { return isPossibleTriangle(spec) })
	return possibleTriangles.length
}

// Run tests to confirm requirements have been met
(function runTests () {
	assert.equal(isPossibleTriangle([5, 10, 25]), false)
	assert.equal(isPossibleTriangle([30, 10, 25]), true)
})()

advent.displayResults(answer1(input), answer2(input))