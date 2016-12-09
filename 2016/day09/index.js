// http://adventofcode.com/2016/day/9
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const getMarker = (str) => {
	const markerRegEx = /\(\d+x\d+\)/
	const markerInfoRegEx = /^\((\d+)x(\d+)\)$/

	let marker = markerRegEx.exec(str)
	if (marker === null) { return false }

	let markerInfo = markerInfoRegEx.exec(marker[0])
	let markerText = markerInfo[0]
	let numChars = parseInt(markerInfo[1], 10)
	let numTimes = parseInt(markerInfo[2], 10)

	return {
		textBefore: str.substr(0, marker.index),
		text: str.substr(marker.index+markerText.length, numChars),
		textAfter: str.substring(marker.index + markerText.length + numChars),
		markerText,
		numChars,
		numTimes
	}
}

const calcDecompressedSize = (str) => {
	let markerInfo
	let size = 0
	while ((markerInfo = getMarker(str)) !== false) {
		size += markerInfo.textBefore.length +
				(calcDecompressedSize(markerInfo.text) * markerInfo.numTimes)
		str = markerInfo.textAfter
	}
	// Count the remaining contents
	return size + str.length
}

const decompress = (str) => {
	let output = ""
	let markerInfo

	while ((markerInfo = getMarker(str)) !== false) {
		output += markerInfo.textBefore + markerInfo.text.repeat(markerInfo.numTimes)
		str = markerInfo.textAfter
	}
	// Grab the remaining contents
	return output + str
}

const answer1 = (input) => decompress(input).length
const answer2 = (input) => calcDecompressedSize(input)

// Run tests to confirm requirements have been met
advent.runTests([
	// PART ONE
	() => { assert.equal(decompress("ADVENT"), "ADVENT") },
	() => { assert.equal(decompress("A(1x5)BC"), "ABBBBBC") },
	() => { assert.equal(decompress("(3x3)XYZ"), "XYZXYZXYZ") },
	() => { assert.equal(decompress("A(2x2)BCD(2x2)EFG"), "ABCBCDEFEFG") },
	() => { assert.equal(decompress("(6x1)(1x3)A"), "(1x3)A") },
	() => { assert.equal(decompress("X(8x2)(3x3)ABCY"), "X(3x3)ABC(3x3)ABCY") },
	// PART TWO
	() => { assert.equal(calcDecompressedSize("(3x3)XYZ"), 9) },
	() => { assert.equal(calcDecompressedSize("X(8x2)(3x3)ABCY"), 20) },
	() => { assert.equal(calcDecompressedSize("(27x12)(20x12)(13x14)(7x10)(1x12)A"), 241920) },
	() => { assert.equal(calcDecompressedSize("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN"), 445) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)