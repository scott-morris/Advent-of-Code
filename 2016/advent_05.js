/*
You are faced with a security door designed by Easter Bunny engineers that
seem to have acquired most of their security knowledge by watching hacking
movies.

The eight-character password for the door is generated one character at a time
by finding the MD5 hash of some Door ID (your puzzle input) and an increasing
integer index (starting with 0).

A hash indicates the next character in the password if its hexadecimal
representation starts with five zeroes. If it does, the sixth character in the
hash is the next character of the password.

For example, if the Door ID is abc:

- The first index which produces a hash that starts with five zeroes is
  3231929, which we find by hashing abc3231929; the sixth character of the
  hash, and thus the first character of the password, is 1.
- 5017308 produces the next interesting hash, which starts with 000008f82...,
  so the second character of the password is 8.
- The third time a hash starts with five zeroes is for abc5278568, discovering
  the character f.

In this example, after continuing this search a total of eight times, the
password is 18f47a30.

PART ONE:
Given the actual Door ID, what is the password?

PART TWO:
As the door slides open, you are presented with a second door that uses a
slightly more inspired security mechanism. Clearly unimpressed by the last
version (in what movie is the password decrypted in order?!), the Easter Bunny
engineers have worked out a better solution.

Instead of simply filling in the password from left to right, the hash now
also indicates the position within the password to fill. You still look for
hashes that begin with five zeroes; however, now, the sixth character
represents the position (0-7), and the seventh character is the character to
put in that position.

A hash result of 000001f means that f is the second character in the password.
Use only the first result for each position, and ignore invalid positions.

For example, if the Door ID is abc:

- The first interesting hash is from abc3231929, which produces 0000015...;
  so, 5 goes in position 1: _5______.
- In the previous method, 5017308 produced an interesting hash; however, it is
  ignored, because it specifies an invalid position (8).
- The second interesting hash is at index 5357525, which produces 000004e...;
  so, e goes in position 4: _5__e___.

You almost choke on your popcorn as the final character falls into place,
producing the password 05ace8e3.

Given the actual Door ID and this new method, what is the password? Be extra
proud of your solution if it uses a cinematic "decrypting" animation.
*/
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