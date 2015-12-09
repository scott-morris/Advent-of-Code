/*
	Every year, Santa manages to deliver all of his presents in a single night.

	This year, however, he has some new locations to visit; his elves have
	provided him the distances between every pair of locations. He can start and
	end at any two (different) locations he wants, but he must visit each location
	exactly once. What is the shortest distance he can travel to achieve this?

	For example, given the following distances:

	- London to Dublin = 464
	- London to Belfast = 518
	- Dublin to Belfast = 141

	The possible routes are therefore:

	- Dublin -> London -> Belfast = 982
	- London -> Dublin -> Belfast = 605
	- London -> Belfast -> Dublin = 659
	- Dublin -> Belfast -> London = 659
	- Belfast -> Dublin -> London = 605
	- Belfast -> London -> Dublin = 982

	The shortest of these is London -> Dublin -> Belfast = 605, and so the answer
	is 605 in this example.

	PART ONE:
	What is the distance of the shortest route?

	PART TWO:
	TBD
*/
;(function (input) {
	var answer1,
		answer2;

	console.log("Answer #1:", answer1);
	console.log("Answer #2:", answer2);
})([
	"Faerun to Tristram = 65",
	"Faerun to Tambi = 129",
	"Faerun to Norrath = 144",
	"Faerun to Snowdin = 71",
	"Faerun to Straylight = 137",
	"Faerun to AlphaCentauri = 3",
	"Faerun to Arbre = 149",
	"Tristram to Tambi = 63",
	"Tristram to Norrath = 4",
	"Tristram to Snowdin = 105",
	"Tristram to Straylight = 125",
	"Tristram to AlphaCentauri = 55",
	"Tristram to Arbre = 14",
	"Tambi to Norrath = 68",
	"Tambi to Snowdin = 52",
	"Tambi to Straylight = 65",
	"Tambi to AlphaCentauri = 22",
	"Tambi to Arbre = 143",
	"Norrath to Snowdin = 8",
	"Norrath to Straylight = 23",
	"Norrath to AlphaCentauri = 136",
	"Norrath to Arbre = 115",
	"Snowdin to Straylight = 101",
	"Snowdin to AlphaCentauri = 84",
	"Snowdin to Arbre = 96",
	"Straylight to AlphaCentauri = 107",
	"Straylight to Arbre = 14",
	"AlphaCentauri to Arbre = 46"
]);