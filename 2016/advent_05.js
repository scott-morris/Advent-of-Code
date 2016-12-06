// http://adventofcode.com/2016/day/5
"use strict"

const advent = require("./lib/advent.js")
const input = advent.getInput(5)
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
        advent.log("Password", password)
    }

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
                advent.log("Hash found, password updated", password)
            }
        }
    } while (/\*/.test(password))

    return password
}

// Run tests to confirm requirements have been met
(function runTests () {
    let testInfo1 = nextHashWithFiveZeroes("abc")
    let testInfo2 = nextHashWithFiveZeroes("abc", testInfo1.index)
    let testInfo3 = nextHashWithFiveZeroes("abc", testInfo2.index)

    assert.equal(testInfo1.index, 3231929)
    assert.equal(testInfo2.index, 5017308)
    assert.equal(testInfo3.index, 5278568)
    assert.equal(answer1("abc"), "18f47a30")

    assert.equal(answer2("abc"), "05ace8e3")
})()

advent.displayResults(answer1(input), answer2(input))