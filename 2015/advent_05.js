/*
	Santa needs help figuring out which strings in his text file are naughty or nice.

	A nice string is one with all of the following properties:

	- It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
	- It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or
		aabbccdd (aa, bb, cc, or dd).
	- It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the
		other requirements.

	PART ONE:
	How many strings are nice?

	----

	Realizing the error of his ways, Santa has switched to a better model of determining
	whether a string is naughty or nice. None of the old rules apply, as they are all
	clearly ridiculous.

	Now, a nice string is one with all of the following properties:

	- It contains a pair of any two letters that appears at least twice in the string
		without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but
		it overlaps).
	- It contains at least one letter which repeats with exactly one letter between them,
		like xyx, abcdefeghi (efe), or even aaa.

	PART TWO:
	How many strings are nice under these new rules?
*/
var fs = require("fs"),
	input = fs.readFileSync("./inputs/advent_05.txt", "utf8").split("\n");

;(function (input) {
	var answer1 = 0,
		answer2 = 0;

	function match(txt, re) {
		return (txt.match(re) || []);
	}

	function hasThreeVowels (txt) {
		var re = /[aeiou]/ig;
		return (match(txt, re).length >= 3);
	}

	function hasDoubleLetter (txt) {
		var re = /([a-z])\1/ig;
		return (match(txt, re).length > 0);
	}

	function hasNaughtyStrings (txt) {
		var re = /(ab|cd|pq|xy)/ig;
		return (match(txt, re).length > 0);
	}

	function hasMatchingDoubles (txt) {
		var reDouble = /([a-z]{2})(?:.*\1)/ig,
			reTriple = /([a-z])\1\1/ig,
			mDouble = match(txt, reDouble),
			mTriple = match(txt, reTriple),
			matchedDouble = mDouble.sort().filter(function (element, index, array) {
				return ((index === 0) || (element !== array[index - 1]));
			});

		if (mTriple.length > 0) {
			mTriple.forEach(function (triple) {
				var i = matchedDouble.indexOf(triple.substr(2));
				if (i > -1) {
					matchedDouble.slice(i,1);
				}
			});
		}

		if (matchedDouble.length > 0) { console.log(txt + " has matched double: ", matchedDouble); }
		return (matchedDouble.length > 0);
	}

	function hasAlterns (txt) {
		var re = /([a-z])\S\1/ig;
		return (match(txt, re).length > 0);
	}

	input.forEach(function (str) {
		if (hasThreeVowels(str) && hasDoubleLetter(str) && !hasNaughtyStrings(str)) {
			answer1++;
		}

		if (hasMatchingDoubles(str) && hasAlterns(str)) {
			answer2++;
		}
	});

	console.log("nice count #1:", answer1);
	console.log("nice count #2:", answer2);
})(input);
