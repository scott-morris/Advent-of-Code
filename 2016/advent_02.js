/*
You arrive at Easter Bunny Headquarters under cover of darkness. However, you
left in such a rush that you forgot to use the bathroom! Fancy office
buildings like this one usually have keypad locks on their bathrooms, so you
search the front desk for the code.

"In order to improve security," the document you find says, "bathroom codes
will no longer be written down. Instead, please memorize and follow the
procedure below to access the bathrooms."

The document goes on to explain that each button to be pressed can be found by
starting on the previous button and moving to adjacent buttons on the keypad:
U moves up, D moves down, L moves left, and R moves right. Each line of
instructions corresponds to one button, starting at the previous button (or,
for the first line, the "5" button); press whatever button you're on at the
end of each line. If a move doesn't lead to a button, ignore it.

You can't hold it much longer, so you decide to figure out the code as you
walk to the bathroom. You picture a keypad like this:

	1 2 3
	4 5 6
	7 8 9

Suppose your instructions are:

	ULL
	RRDDD
	LURDL
	UUUUD

- You start at "5" and move up (to "2"), left (to "1"), and left (you can't,
  and stay on "1"), so the first button is 1.
- Starting from the previous button ("1"), you move right twice (to "3") and
  then down three times (stopping at "9" after two moves and ignoring the
  third), ending up with 9.
- Continuing from "9", you move left, up, right, down, and left, ending with
  8.
- Finally, you move up four times (stopping at "2"), then down once, ending
  with 5.

So, in this example, the bathroom code is 1985.

Your puzzle input is the instructions from the document you found at the front desk.

PART ONE:
You finally arrive at the bathroom (it's a several minute walk from the lobby
so visitors can behold the many fancy conference rooms and water coolers on
this floor) and go to punch in the code. Much to your bladder's dismay, the
keypad is not at all like you imagined it. Instead, you are confronted with
the result of hundreds of man-hours of bathroom-keypad-design meetings:

	    1
	  2 3 4
	5 6 7 8 9
	  A B C
	    D

You still start at "5" and stop when you're at an edge, but given the same
instructions as above, the outcome is very different:

- You start at "5" and don't move at all (up and left are both edges), ending
  at 5.
- Continuing from "5", you move right twice and down three times (through "6",
  "7", "B", "D", "D"), ending at D.
- Then, from "D", you move five more times (through "D", "B", "C", "C", "B"),
  ending at B.
- Finally, after five more moves, you end at 3.

So, given the actual keypad layout, the code would be 5DB3.

Using the same instructions in your puzzle input, what is the correct bathroom code?


PART TWO:
Describe answer #2
*/
"use strict"

const advent = require("./lib/advent.js")
const input = advent.getInputArray(2)
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