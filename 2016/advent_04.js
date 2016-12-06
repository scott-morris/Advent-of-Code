// http://adventofcode.com/2016/day/4
"use strict"

const _ = require("lodash")
const advent = require("./lib/advent.js")
const input = advent.getInput(4)
const assert = require("assert")

const parseSpec = /^([a-z\-]+)-(\d+)\[([a-z]+)\]$/
const ALPHA_BASE = "a".charCodeAt(0) - 1

const shiftLetter = (letter, shiftBy) => {
    let letterIndex = letter.charCodeAt(0) - ALPHA_BASE
    let newLetterIndex = (letterIndex + shiftBy) % 26
    return String.fromCharCode(ALPHA_BASE + newLetterIndex)
}

const decrypt = (str, shiftBy) =>
    str.replace(/[a-z\-]/g, (letter) =>
        (letter === "-") ? " " : shiftLetter(letter, shiftBy))

class Room {
    constructor (spec) {
        let parse = spec.match(parseSpec)

        this.name = parse[1]
        this.id = parseInt(parse[2], 10)
        this.checksum = parse[3]
        this.realname = decrypt(this.name, this.id)
    }

    get calcChecksum () {
        let letters = {}

        this.name.match(/[a-z]/g).forEach((letter) => {
            let letterCount = letters[letter] || 0
            letters[letter] = ++letterCount
        })

        let letterList = Object.keys(letters).map((letter) => {
            return {
                "letter": letter,
                "count": 0 - letters[letter] // we want this to be negative for sorting
            }
        })

        let sortedList = _.sortBy(letterList, ["count", "letter"])

        let checksum = ""
        for (let i=0; i < 5; i++) {
            checksum += sortedList[i].letter
        }
        return checksum
    }

    get isValid () {
        return (this.calcChecksum === this.checksum)
    }
}

const answer1 = (input) => {
    let rooms = input.map((spec) => new Room(spec))
    let validRooms = rooms.filter((room) => { return room.checksum === room.calcChecksum })
    return validRooms.reduce((sum, room) => { return sum += room.id }, 0)
}

const answer2 = (input) => {
    let rooms = input.map((spec) => new Room(spec))
    let keyRoom = rooms.filter((room) => {
        return ((room.checksum === room.calcChecksum) &&
                (room.realname === "northpole object storage"))
    })[0]

    return keyRoom.id
}

// Run tests to confirm requirements have been met
(function runTests () {
    let testData = [
        "aaaaa-bbb-z-y-x-123[abxyz]",
        "a-b-c-d-e-f-g-h-987[abcde]",
        "not-a-real-room-404[oarel]",
        "totally-real-room-200[decoy]"
    ]
    let testRoom1 = new Room(testData[0])
    let testRoom2 = new Room(testData[1])
    let testRoom3 = new Room(testData[2])
    let testRoom4 = new Room(testData[3])

    assert.equal(testRoom1.isValid, true)
    assert.equal(testRoom2.isValid, true)
    assert.equal(testRoom3.isValid, true)
    assert.equal(testRoom4.isValid, false)

    assert.equal(answer1(testData), 1514)

    let testRoom5 = new Room("qzmt-zixmtkozy-ivhz-343[zimth]")
    assert.equal(testRoom5.realname, "very encrypted name")
})()

advent.displayResults(answer1(input), answer2(input))