// http://adventofcode.com/2016/day/6
"use strict"

const advent = require("./lib/advent.js")
const input = advent.getInput(6)
const assert = require("assert")

const characterDistribution = (input) => {
	// Start with an array of empty objects
	let keyLength = input[0].length
	let charCounts = Array.apply(null, { length: keyLength }).map(() => { return {} })

	input.forEach(message => {
		let chars = message.split("")
		chars.forEach((char, i) => {
			charCounts[i][char] = charCounts[i][char] || 0
			charCounts[i][char]++
		})
	})

	return charCounts
}

const answer1 = (input) => {
	let charCounts = characterDistribution(input)

	return charCounts.map(position => {
		let maxCount = 0
		let maxChar = ""

		Object.keys(position).forEach(key => {
			if (position[key] > maxCount) {
				maxCount = position[key]
				maxChar = key
			}
		})

		return maxChar
	}).join("")
}
const answer2 = (input) => {
	let charCounts = characterDistribution(input)

	return charCounts.map(position => {
		let maxCount = input.length
		let maxChar = ""

		Object.keys(position).forEach(key => {
			if (position[key] < maxCount) {
				maxCount = position[key]
				maxChar = key
			}
		})

		return maxChar
	}).join("")
}

// Run tests to confirm requirements have been met
advent.runTests([
	() => {
		let testData = [
			"eedadn",
			"drvtee",
			"eandsr",
			"raavrd",
			"atevrs",
			"tsrnev",
			"sdttsa",
			"rasrtv",
			"nssdts",
			"ntnada",
			"svetve",
			"tesnvt",
			"vntsnd",
			"vrdear",
			"dvrsen",
			"enarar"
		]
		assert.equal(answer1(testData), "easter")
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)