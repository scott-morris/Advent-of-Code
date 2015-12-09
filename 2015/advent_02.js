/*
	The elves are running low on wrapping paper, and so they need to submit an order for more.
	They have a list of the dimensions (length l, width w, and height h) of each present, and
	only want to order exactly as much as they need.

	Fortunately, every present is a box (a perfect right rectangular prism), which makes
	calculating the required wrapping paper for each gift a little easier: find the surface
	area of the box, which is 2*l*w + 2*w*h + 2*h*l. The elves also need a little extra paper
	for each present: the area of the smallest side.

	----

	The elves are also running low on ribbon. Ribbon is all the same width, so they only have
	to worry about the length they need to order, which they would again like to be exact.

	The ribbon required to wrap a present is the shortest distance around its sides, or the
	smallest perimeter of any one face. Each present also requires a bow made out of ribbon as
	well; the feet of ribbon required for the perfect bow is equal to the cubic feet of volume
	of the present. Don't ask how they tie the bow, though; they'll never tell.

	----

	All numbers in the elves' list are in feet.

	PART ONE:
	How many total square feet of wrapping paper should they order?

	PART TWO:
	How many total feet of ribbon should they order?
*/
var fs = require("fs"),
	input = fs.readFileSync("./inputs/advent_02.txt", "utf8").split("\n");

;(function (input) {
	var answer1 = 0,
		answer2 = 0;

	function Gift(str) {
		var d = str.split("x");

		this.width = Number.parseInt(d[0]);
		this.height = Number.parseInt(d[1]);
		this.depth = Number.parseInt(d[2]);

		this.sides = {
			"front": this.width * this.height,
			"side": this.height * this.depth,
			"top": this.width * this.depth
		};

		this.dimensions = {
			"lengths": [this.width, this.height, this.depth],
			"sides": [this.sides.front, this.sides.side, this.sides.top]
		};

		this.volume = this.width * this.height * this.depth;
	}

	input.forEach(function(str) {
		var giftInfo = new Gift(str),
			wrappingPaper = giftInfo.dimensions.sides.reduce(function (prevVal, val) { 
				return prevVal + (val * 2);
			}, 0) + Math.min.apply(null, giftInfo.dimensions.sides),
			ribbon = giftInfo.dimensions.lengths.reduce(function (prevVal, val) {
				return prevVal + (val * 2);
			}, 0) - (Math.max.apply(null, giftInfo.dimensions.lengths) * 2) + giftInfo.volume;

		answer1 += wrappingPaper;
		answer2 += ribbon;
	});

	console.log("Answer #1:", answer1);
	console.log("Answer #2:", answer2);
})(input);