;(function (exports) {
	var fs = require("fs"),
		colors = require("colors");

	function _fileName (day) {
		return (day < 10)
			? "./inputs/advent_0" + day + ".txt"
			: "./inputs/advent_" + day + ".txt";
	}

	exports.getInput = function (day) {
		return fs.readFileSync(_fileName(day), "utf8");
	};

	exports.getInputArray = function (day) {
		return fs.readFileSync(_fileName(day), "utf8").split("\n");
	}

	exports.displayResults = function (answer1, answer2) {
		if (typeof answer1 === "object") {
			answer1 = JSON.stringify(answer1);
		}

		if (typeof answer2 === "object") {
			answer2 = JSON.stringify(answer2);
		}

		console.log("Answer #1:".red.bold, colors.green(answer1));
		console.log("Answer #2:".red.bold, colors.green(answer2));
	};
})(exports);