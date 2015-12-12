/*
	Santa's previous password expired, and he needs help choosing a new one.

	To help him remember his new password after the old one expires, Santa has
	devised a method of coming up with a password based on the previous one.
	Corporate policy dictates that passwords must be exactly eight lowercase
	letters (for security reasons), so he finds his new password by incrementing
	his old password string repeatedly until it is valid.

	Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so
	on. Increase the rightmost letter one step; if it was z, it wraps around to a,
	and repeat with the next letter to the left until one doesn't wrap around.

	Unfortunately for Santa, a new Security-Elf recently started, and he has
	imposed some additional password requirements:

	- Passwords must include one increasing straight of at least three letters,
	  like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd
	  doesn't count.

	- Passwords may not contain the letters i, o, or l, as these letters can be
	  mistaken for other characters and are therefore confusing.

	- Passwords must contain at least two different, non-overlapping pairs of
	  letters, like aa, bb, or zz.

	For example:

	- hijklmmn meets the first requirement (because it contains the straight hij)
	  but fails the second requirement requirement (because it contains i and l).

	- abbceffg meets the third requirement (because it repeats bb and ff) but
	  fails the first requirement.

	- abbcegjk fails the third requirement, because it only has one double letter
	  (bb).

	- The next password after abcdefgh is abcdffaa.

	- The next password after ghijklmn is ghjaabcc, because you eventually skip
	  all the passwords that start with ghi..., since i is not allowed.

	PART ONE:
	Given Santa's current password (your puzzle input), what should his next
	password be?

	PART TWO:
	Santa's password expired again. What's the next one?

*/
var fs = require("fs"),
	assert = require("assert"),
	input = fs.readFileSync("./inputs/advent_11.txt", "utf8"); //.split("\n"); // if multi-line to change to array

;(function (input) {
	var answer1,
		answer2,
		validStraights = [],
		validPairs = [],
		badChars = ["i", "o", "l"];

	// Initialize helpers
	for (var i = "a".charCodeAt(0); i <= "x".charCodeAt(0); i++) {
		validStraights.push(String.fromCharCode(i) + String.fromCharCode(i+1) + String.fromCharCode(i+2));
		validPairs.push(String.fromCharCode(i) + String.fromCharCode(i));
	}
	validPairs.push("yy");
	validPairs.push("zz");

	function hasStraight (str) {
		return validStraights.some(function (straight) {
			return (str.indexOf(straight) > -1);
		});
	}

	function avoidsBadChars (str) {
		return badChars.every(function (char) {
			return (str.indexOf(char) === -1);
		});
	}

	function hasTwoPairs (str) {
		var numHelpers = 0;

		validPairs.forEach(function (pair) {
			if (str.indexOf(pair) > -1) {
				numHelpers++;
			}
		});

		return (numHelpers >= 2);
	}

	function nextLetter (char) {
		return (char === "z") ? "a" : String.fromCharCode(char.charCodeAt(0) + 1);
	}

	function nextPassword (str) {
		var chars = str.split("").reverse();

		for (var i = 0; i < chars.length; i++) {
			chars[i] = nextLetter(chars[i]);
			if (chars[i] !== "a") break;
		}

		return chars.reverse().join("");
	}

	function isValidPassword (str) {
		return (hasStraight(str) && avoidsBadChars(str) && hasTwoPairs(str));
	}

	function nextValidPassword (str) {
		var output = str;

		do {
			output = nextPassword(output);
		} while (!isValidPassword(output));

		return output;
	}

	// Run tests to confirm requirements have been met
	assert.equal(hasStraight("hijklmmn"), true, "string one, test 1");
	assert.equal(avoidsBadChars("hijklmmn"), false, "string one, test 2");

	assert.equal(hasTwoPairs("abbceffg"), true, "string two, test 1");
	assert.equal(hasStraight("abbceffg"), false, "string two, test 2");

	assert.equal(hasTwoPairs("abbcegjk"), false, "string three test");

	assert.equal(nextPassword("xx"), "xy");
	assert.equal(nextPassword("xy"), "xz");
	assert.equal(nextPassword("xz"), "ya");

	assert.equal(nextValidPassword("abcdefgh"),"abcdffaa");
	assert.equal(nextValidPassword("ghijklmn"),"ghjaabcc");

	// Set answer
	answer1 = nextValidPassword(input);
	answer2 = nextValidPassword(answer1);

	console.log("Answer #1:", answer1);
	console.log("Answer #2:", answer2);
})(input);