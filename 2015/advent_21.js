/*
	Little Henry Case got a new video game for Christmas. It's an RPG, and he's
	stuck on a boss. He needs to know what equipment to buy at the shop. He hands
	you the controller.

	In this game, the player (you) and the enemy (the boss) take turns attacking.
	The player always goes first. Each attack reduces the opponent's hit points by
	at least 1. The first character at or below 0 hit points loses.

	Damage dealt by an attacker each turn is equal to the attacker's damage score
	minus the defender's armor score. An attacker always does at least 1 damage.
	So, if the attacker has a damage score of 8, and the defender has an armor
	score of 3, the defender loses 5 hit points. If the defender had an armor
	score of 300, the defender would still lose 1 hit point.

	Your damage score and armor score both start at zero. They can be increased by
	buying items in exchange for gold. You start with no items and have as much
	gold as you need. Your total damage or armor is equal to the sum of those
	stats from all of your items. You have 100 hit points.

	Here is what the item shop is selling:

		Weapons:    Cost  Damage  Armor
		Dagger        8     4       0
		Shortsword   10     5       0
		Warhammer    25     6       0
		Longsword    40     7       0
		Greataxe     74     8       0

		Armor:      Cost  Damage  Armor
		Leather      13     0       1
		Chainmail    31     0       2
		Splintmail   53     0       3
		Bandedmail   75     0       4
		Platemail   102     0       5

		Rings:      Cost  Damage  Armor
		Damage +1    25     1       0
		Damage +2    50     2       0
		Damage +3   100     3       0
		Defense +1   20     0       1
		Defense +2   40     0       2
		Defense +3   80     0       3

	You must buy exactly one weapon; no dual-wielding. Armor is optional, but you
	can't use more than one. You can buy 0-2 rings (at most one for each hand).
	You must use any items you buy. The shop only has one of each item, so you
	can't buy, for example, two rings of Damage +3.

	For example, suppose you have 8 hit points, 5 damage, and 5 armor, and that
	the boss has 12 hit points, 7 damage, and 2 armor:

		The player deals 5-2 = 3 damage; the boss goes down to 9 hit points.
		The boss deals 7-5 = 2 damage; the player goes down to 6 hit points.
		The player deals 5-2 = 3 damage; the boss goes down to 6 hit points.
		The boss deals 7-5 = 2 damage; the player goes down to 4 hit points.
		The player deals 5-2 = 3 damage; the boss goes down to 3 hit points.
		The boss deals 7-5 = 2 damage; the player goes down to 2 hit points.
		The player deals 5-2 = 3 damage; the boss goes down to 0 hit points.
		In this scenario, the player wins! (Barely.)

	PART ONE:
	You have 100 hit points. The boss's actual stats are in your puzzle input.
	What is the least amount of gold you can spend and still win the fight?

	PART TWO:
	Describe answer #2
*/
;(function (advent) {
	var input = advent.getInputArray(21),
		assert = require("assert"),
		shop = {
			"weapons": {
				"dagger": {
					"cost": 8,
					"damage": 4,
					"armor": 0
				},
				"shortsword": {
					"cost": 10,
					"damage": 5,
					"armor": 0
				},
				"warhammer": {
					"cost": 25,
					"damage": 6,
					"armor": 0
				},
				"longsword": {
					"cost": 40,
					"damage": 7,
					"armor": 0
				},
				"greataxe": {
					"cost": 74,
					"damage": 8,
					"armor": 0
				}
			},
			"armor": {
				"leather": {
					"cost": 13,
					"damage": 0,
					"armor": 1
				},
				"chainmail": {
					"cost": 31,
					"damage": 0,
					"armor": 2
				},
				"splintmail": {
					"cost": 53,
					"damage": 0,
					"armor": 3
				},
				"bandedmail": {
					"cost": 75,
					"damage": 0,
					"armor": 4
				},
				"platemail": {
					"cost": 102,
					"damage": 0,
					"armor": 5
				}
			},
			"rings": {
				"damage +1": {
					"cost": 25,
					"damage": 1,
					"armor": 0
				},
				"damage +2": {
					"cost": 50,
					"damage": 2,
					"armor": 0
				},
				"damage +3": {
					"cost": 100,
					"damage": 3,
					"armor": 0
				},
				"defense +1": {
					"cost": 20,
					"damage": 0,
					"armor": 1
				},
				"defense +2": {
					"cost": 40,
					"damage": 0,
					"armor": 2
				},
				"defense +3": {
					"cost": 80,
					"damage": 0,
					"armor": 3
				}
			}
		},
		inventory = [],
		playerStats = {},
		bossStats = {
			"hitPoints": parseInt(input[0].match(/(\d+)/)[1],10),
			"damage": parseInt(input[1].match(/(\d+)/)[1],10),
			"armor": parseInt(input[2].match(/(\d+)/)[1],10)
		};

	function calculateStats (inventory) {
		var calcStats = {
			"hitPoints": 100,
			"cost": 0,
			"damage": 0,
			"armor": 0
		};

		inventory.forEach(function (item) {
			calcStats.cost += item.cost;
			calcStats.damage += item.damage;
			calcStats.armor += item.armor;
		});

		return calcStats;
	}

	function battle (player, boss) {
		var playerWins = false,
			numRounds = 0;

		return {
			"playerWins": playerWins,
			"playerHP": player.hitPoints,
			"bossHP": boss.hitPoints,
			"numRounds": numRounds
		};
	}

	function answer1 (str) {
		// Every weapon (including no weapon)
			// Every armor (including no armor)
				// Every combination of two rings (including no rings)
	}

	function answer2 (str) {

	}

	// Run tests to confirm requirements have been met
	(function runTests () {
		var testPlayer = { "hitPoints": 8, "damage": 5, "armor": 5 },
			testBoss = { "hitPoints": 12, "damage": 7, "armor": 2 },
			testResults = battle(testPlayer, testBoss);

		assert.equal(testResults.playerWins, true);
		assert.equal(testResults.playerHP, 2);
		assert.equal(testResults.bossHP, 0);
		assert.equal(testResults.numRounds, 4);
	})();

	console.log(bossStats);
	advent.displayResults(answer1(), answer2());
})(require("./lib/advent.js"));