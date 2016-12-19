// http://adventofcode.com/2016/day/19
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

class ElfCircle {
	constructor (size) {
		this.elves = Array.apply(null,{length:size}).map((elf,index) => {
			return {
				id: index+1,
				presents:1
			}
		})
	}

	presents (id) {
		let findElf = this.elves.filter(elf=>elf.id===id)
		return (findElf.length === 1) ? findElf[0].presents : 0
	}

	goOneRound () {
		let index = 0
		let moreToGo = true

		while (moreToGo) {
			if (index+1 < this.elves.length) {
				this.elves[index].presents += this.elves[index+1].presents
				this.elves.splice(index+1,1)
				index++
			} else if (index+1 === this.elves.length) {
				this.elves[index].presents += this.elves[0].presents
				this.elves.splice(0, 1)
				moreToGo = false
			} else {
				moreToGo = false
			}
		}
	}

	lastOne () {
		while (this.elves.length > 1) {
			this.goOneRound()
			advent.log("Round complete - elves remaining", this.elves.length)
		}

		return this.elves[0].id
	}
}

const answer1 = (input) => {
	const size = parseInt(input,10)
	let circle = new ElfCircle(size)
	return circle.lastOne()
}
const answer2 = (input) => {}

// Run tests to confirm requirements have been met
advent.runTests([
	() => {
		let testRun = new ElfCircle(5)
		testRun.goOneRound()
		advent.log("elves", testRun.elves)
		assert.equal(testRun.presents(1), 0)
		assert.equal(testRun.presents(2), 0)
		assert.equal(testRun.presents(3), 2)
		assert.equal(testRun.presents(4), 0)
		assert.equal(testRun.presents(5), 3)
	},
	() => {
		let testRun = new ElfCircle(5)
		assert.equal(testRun.lastOne(), 3)
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)
