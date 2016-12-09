// http://adventofcode.com/2016/day/9
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const markerRegEx = /\(\d+x\d+\)/

const getMarkerInfo = (markerText) => {
	const markerInfoRegEx = /^\((\d+)x(\d+)\)$/

	if (!markerInfoRegEx.test(markerText)) {
		throw new Error(`"${markerText}" does not match marker syntax`)
	}

	let markerInfo = markerInfoRegEx.exec(markerText)

	return {
		fullText: markerText,
		numChars: parseInt(markerInfo[1], 10),
		numTimes: parseInt(markerInfo[2], 10)
	}
}

const calcDecompressedSize = (str) => {
	let marker, markerText, markerInfo
	let size = 0
	while ((marker = markerRegEx.exec(str)) !== null) {
		// count everything before the marker
		size += marker.index
		str = str.substring(marker.index)

		// then process the marker
		markerInfo = getMarkerInfo(marker[0])

		// take the marker out of the source string
		str = str.substring(markerInfo.fullText.length)

		// Recursively call this function with the marker substring
		size += (calcDecompressedSize(str.substring(0, markerInfo.numChars)) * markerInfo.numTimes)

		// Update the working string
		str = str.substring(markerInfo.numChars)
	}
	// Count the remaining contents
	size += str.length

	return size
}

const decompress = (str) => {
	let output = ""
	let marker, markerInfo

	while ((marker = markerRegEx.exec(str)) !== null) {
		// take everything before the marker
		output += str.substr(0, marker.index)
		str = str.substring(marker.index)

		// then process the marker
		markerInfo = getMarkerInfo(marker[0])

		// take the marker out of the source string
		str = str.substring(markerInfo.fullText.length)

		output += str.substring(0, markerInfo.numChars).repeat(markerInfo.numTimes)

		// update the working string
		str = str.substring(markerInfo.numChars)
	}
	// Grab the remaining contents
	output += str

	return output
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