/*
	This year is the Reindeer Olympics! Reindeer can fly at high speeds, but must
	rest occasionally to recover their energy. Santa would like to know which of
	his reindeer is fastest, and so he has them race.

	Reindeer can only either be flying (always at their top speed) or resting (not
	moving at all), and always spend whole seconds in either state.

	For example, suppose you have the following Reindeer:

		- Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
		- Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.

	After one second, Comet has gone 14 km, while Dancer has gone 16 km. After ten
	seconds, Comet has gone 140 km, while Dancer has gone 160 km. On the eleventh
	second, Comet begins resting (staying at 140 km), and Dancer continues on for
	a total distance of 176 km. On the 12th second, both reindeer are resting.
	They continue to rest until the 138th second, when Comet flies for another ten
	seconds. On the 174th second, Dancer flies for another 11 seconds.

	In this example, after the 1000th second, both reindeer are resting, and Comet
	is in the lead at 1120 km (poor Dancer has only gotten 1056 km by that point).
	So, in this situation, Comet would win (if the race ended at 1000 seconds).


	PART ONE:
	Given the descriptions of each reindeer (in your puzzle input), after exactly
	2503 seconds, what distance has the winning reindeer traveled?

	----

	Seeing how reindeer move in bursts, Santa decides he's not pleased with the
	old scoring system.

	Instead, at the end of each second, he awards one point to the reindeer
	currently in the lead. (If there are multiple reindeer tied for the lead, they
	each get one point.) He keeps the traditional 2503 second time limit, of
	course, as doing otherwise would be entirely ridiculous.

	Given the example reindeer from above, after the first second, Dancer is in
	the lead and gets one point. He stays in the lead until several seconds into
	Comet's second burst: after the 140th second, Comet pulls into the lead and
	gets his first point. Of course, since Dancer had been in the lead for the 139
	seconds before that, he has accumulated 139 points by the 140th second.

	After the 1000th second, Dancer has accumulated 689 points, while poor Comet,
	our old champion, only has 312. So, with the new scoring system, Dancer would
	win (if the race ended at 1000 seconds).

	PART TWO:
	Again given the descriptions of each reindeer (in your puzzle input), after
	exactly 2503 seconds, how many points does the winning reindeer have?
*/
;(function (advent) {
	var input = advent.getInputArray(14),
		assert = require("assert"),
		reindeer = {};

	function reindeerDistance (deer, sec) {
		var cycleTime = deer.duration + deer.rest,
			fullCycles = Math.floor(sec / cycleTime),
			leftOverTime = sec % cycleTime;

		return ((deer.speed * deer.duration) * fullCycles) + 
				(deer.speed * Math.min(leftOverTime, deer.duration));
	}

	function answer1 (time) {
		var maxDistance = 0;

		Object.keys(reindeer).forEach(function (deer) {
			maxDistance = Math.max(maxDistance, reindeerDistance(reindeer[deer], time));
		});

		return maxDistance;
	}

	function answer2 (time) {
		var maxDistance,
			score = {},
			maxScore = 0;

		// Initialize Score
		Object.keys(reindeer).forEach(function (reindeerName) { score[reindeerName] = 0 });

		// Assign Points
		for (var i = 1; i <= time; i++) {
			maxDistance = answer1(i);

			Object.keys(reindeer).forEach(function (reindeerName) {
				if (reindeerDistance(reindeer[reindeerName], i) === maxDistance) {
					score[reindeerName]++;
				}
			});
		}

		// Determine the Winner
		Object.keys(reindeer).forEach(function (reindeerName) {
			maxScore = Math.max(maxScore, score[reindeerName]);
		});

		return maxScore;
	}

	// Run tests to confirm requirements have been met
	(function runTests () {
		assert.equal(true, true);
	})();

	input.forEach(function (spec) {
		var res = spec.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./i);

		reindeer[res[1]] = {
			speed: parseInt(res[2], 10),
			duration: parseInt(res[3], 10),
			rest: parseInt(res[4], 10)
		};
	});

	console.log(reindeer);
	console.log(reindeerDistance(reindeer.Vixen, 1000));

	advent.displayResults(answer1(2503), answer2(2503));
})(require("./lib/advent.js"));