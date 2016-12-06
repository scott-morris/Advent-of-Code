// http://adventofcode.com/2016/day/2
"use strict"

const advent = require("./lib/advent.js")
const input = advent.getInput(2)
const assert = require("assert")

const keypadSetup1 = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"]
]

const keypadSetup2 = [
    [" "," ","1"," "," "],
    [" ","2","3","4"," "],
    ["5","6","7","8","9"],
    [" ","A","B","C"," "],
    [" "," ","D"," "," "]
]

class BathroomCode {
    constructor (keypad, x, y) {
        this.x = x
        this.y = y
        this.keypad = keypad
    }

    move (direction) {
        let newX = this.x
        let newY = this.y

        switch (direction) {
            case "U": newX--; break
            case "D": newX++; break
            case "L": newY--; break
            case "R": newY++; break
        }

        if (this.keypad[newX] !== undefined &&
            this.keypad[newX][newY] !== undefined &&
            this.keypad[newX][newY] !== " ") {

            this.x = newX
            this.y = newY
        }
    }

    followInstructions (instructions) {
        let instr = instructions.split("")

        instr.forEach(instruction => this.move(instruction))
    }

    get digit () {
        return this.keypad[this.x][this.y]
    }
}


let bathroomCode1 = new BathroomCode(keypadSetup1, 1, 1)
let bathroomCode2 = new BathroomCode(keypadSetup2, 2, 0)

const answer1 = (input) => {
    let code = ""
    input.forEach((instructions) => {
        bathroomCode1.followInstructions(instructions)
        code += bathroomCode1.digit;
    })
    return code
}

const answer2 = (input) => {
    let code = ""
    input.forEach((instructions) => {
        bathroomCode2.followInstructions(instructions)
        code += bathroomCode2.digit;
    })
    return code
}

// Run tests to confirm requirements have been met
(function runTests () {
    let test1 = new BathroomCode(keypadSetup1, 1, 1)
    let test2 = new BathroomCode(keypadSetup2, 2, 0)

    test1.followInstructions("ULL")
    assert.equal(test1.digit, "1")

    test1.followInstructions("RRDDD")
    assert.equal(test1.digit, "9")

    test1.followInstructions("LURDL")
    assert.equal(test1.digit, "8")

    test1.followInstructions("UUUUD")
    assert.equal(test1.digit, "5")
    advent.log("Test 1","Passed")

    test2.followInstructions("ULL")
    assert.equal(test2.digit, "5")

    test2.followInstructions("RRDDD")
    assert.equal(test2.digit, "D")

    test2.followInstructions("LURDL")
    assert.equal(test2.digit, "B")

    test2.followInstructions("UUUUD")
    assert.equal(test2.digit, "3")
    advent.log("Test 2","Passed")
})()

advent.displayResults(answer1(input), answer2(input))