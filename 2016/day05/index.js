// http://adventofcode.com/2016/day/5
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput()
const assert = require("assert")
const md5 = require("js-md5")

const replaceAt = (str, index, character) => `${str.substr(0, index)}${character}${str.substr(index+character.length)}`

const nextHashWithFiveZeroes = (str, startWith) => {
    let index = startWith || -1
    let hash
    do {
        index++
        hash = md5(str + index)
    } while (!hash.match(/^00000/))

    return { hash, index }
}

const answer1 = (input) => {
    let password = ""
    let iteration = { index: -1 }

    for (let i=0; i<8; i++) {
        iteration = nextHashWithFiveZeroes(input, iteration.index)
        password += iteration.hash.charAt(5)
        advent.logLine(["Password: ".red.bold, (password + "*******").substring(0,8).green])
    }
    console.log("")

    return password
}

const answer2 = (input) => {
    let password = Array.apply(null, {length: 9}).join("*")
    let iteration = { index: -1 }
    let sixthChar

    do {
        iteration = nextHashWithFiveZeroes(input, iteration.index)
        sixthChar = iteration.hash.charAt(5)
        if (sixthChar.match(/[0-7]/)) {
            sixthChar = parseInt(sixthChar, 10)
            if (password[sixthChar] === "*") {
                password = replaceAt(password, sixthChar, iteration.hash.charAt(6))
                advent.logLine(["Password: ".red.bold, password.green])
            }
        }
    } while (/\*/.test(password))
    console.log("")

    return password
}

// Run tests to confirm requirements have been met
// Run tests to confirm requirements have been met

let testInfo
advent.runTests([
    () => {
        testInfo = nextHashWithFiveZeroes("abc")
        assert.equal(testInfo.index, 3231929)
    },
    () => {
        testInfo = nextHashWithFiveZeroes("abc", testInfo.index)
        assert.equal(testInfo.index, 5017308)
    },
    () => {
        testInfo = nextHashWithFiveZeroes("abc", testInfo.index)
        assert.equal(testInfo.index, 5278568)
    },
    () => {
        assert.equal(answer1("abc"), "18f47a30")
    },
    () => {
        assert.equal(answer2("abc"), "05ace8e3")
    }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)