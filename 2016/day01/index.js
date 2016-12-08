// http://adventofcode.com/2016/day/1
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const cardinals = {
    "N": { "R": "E", "L": "W" },
    "E": { "R": "S", "L": "N" },
    "S": { "R": "W", "L": "E" },
    "W": { "R": "N", "L": "S" }
}

class Walker {
    constructor (instructions) {
        this.cardinal = "N"
        this.x = 0
        this.y = 0
        this.visited = new Set()
        this.dupes = []

        if (instructions) {
            this.walkGrid(instructions)
        }
    }

    walk (steps) {
        let coords

        for (let i = 0; i < steps; i++) {
            switch (this.cardinal) {
                case "N": this.x++; break
                case "E": this.y++; break
                case "S": this.x--; break
                case "W": this.y--; break
            }

            // Keep track of blocks visited
            coords = `${this.x},${this.y}`

            if (this.visited.has(coords)) {
                this.dupes.push(coords)
            }

            this.visited.add(coords)
        }
    }

    turn (direction) {
        this.cardinal = cardinals[this.cardinal][direction]
    }

    walkGrid (instructions) {
        const instructionList = instructions.split(", ")
        let _this = this

        instructionList.forEach(function (instr) {
            const instrParse = instr.match(/([RL])(\d+)/)
            const turnDirection = instrParse[1]
            const goSteps = Number.parseInt(instrParse[2], 10)

            _this.turn(turnDirection)
            _this.walk(goSteps)
        })
    }
}

const answer1 = (walker) => Math.abs(walker.x) + Math.abs(walker.y)

const answer2 = (walker) => {
    const firstDupeCoords = walker.dupes[0].split(",")
    return Math.abs(firstDupeCoords[0]) + Math.abs(firstDupeCoords[1])
}

// Run tests to confirm requirements have been met
advent.runTests([
    () => { assert.equal(answer1(new Walker("R2, L3")), 5) },
    () => { assert.equal(answer1(new Walker("R2, R2, R2")), 2) },
    () => { assert.equal(answer1(new Walker("R5, L5, R5, R3")), 12) },
    () => { assert.equal(answer2(new Walker("R8, R4, R4, R8")), 4) }
])

let walker = new Walker(input)
advent.displayResults(answer1(walker), answer2(walker))
process.exit(0)
