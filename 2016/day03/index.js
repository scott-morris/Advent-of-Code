// http://adventofcode.com/2016/day/3
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput()
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