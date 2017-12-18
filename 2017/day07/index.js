// http://adventofcode.com/2017/day/#
"use strict"

// FROM http://javascriptexample.net/extobjects83.php
const mode = function () {
	var ary, i, max, mode, str;
	ary = Array.prototype.slice.call(arguments);
	max = 0;
	mode = [];
	str = ary.sort();
	str = "~" + str.join('~~') + "~"
	str.replace( /(~\-?\d+~)\1*/g, function(a,b){
		var m = a.length / b.length;
		if (max <= m ) {
			if (max < m) {mode = [];max = m;}
			mode.push( +b.replace(/~/g,""));
		}
	});
	return mode;
}
// END IMPORTED CODE

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

const inputRegEx = /^([a-z]+)\s\((\d+)\)(?:\s\-\>\s(.*))?$/

class ProgramNode {
	constructor (name, weight, children) {
		this.name = name
		this.weight = weight
		this.childNames = children
		this.children = []
		this.parent = void 0
	}

	get totalWeight () {
		return this.childrenWeight.reduce((total, childWeight) => total + childWeight, this.weight)
	}

	get childrenWeight () {
		return this.children.map(child => child.totalWeight)
	}

	get isBalanced () {
		const childrenWeights = this.childrenWeight
		return childrenWeights.length > 0 ?
			childrenWeights.every((childWeight, index, array) => childWeight === array[0]) :
			true
	}

	get unbalancedNodeInfo () {
		// Ignore balanced nodes
		if (this.isBalanced) {
			return void 0
		}

		// Get the value that we are balancing to
		const balanceTo = mode.apply(null, this.childrenWeight)

		// Get the index of the node that doesn't match the mode
		let unbalancedIndex = void 0
		this.children.forEach((child, index) => {
			if (child.totalWeight != balanceTo) {
				unbalancedIndex = index
			}
		})

		// Get the child that needs to be modified
		const unbalancedChild = this.children[unbalancedIndex]

		return {
			mode: balanceTo,
			child: unbalancedChild
		}
	}
}

const parseInputLine = (inputLine) => {
	const result = {}
	const match = inputRegEx.exec(inputLine)

	if (match === null) {
		console.log()
		console.log("Match not found on")
		console.log(`"${inputLine}"`)
	}

	match.shift() // remove the full match

	const name = match.shift()
	const weight = Number(match.shift())
	const children = match.shift()

	const childrenArray = (typeof children === "string") ?
		children.split(", ") :
		[]

	return new ProgramNode(name, weight, childrenArray)
}

const flattenArray = (objectArray) => {
	return objectArray.reduce((result, object) => {
		result[object.name] = object
		return result
	}, {})
}

const constructTree = (flatObject) => {
	const object = Object.assign({}, flatObject)

	Object.keys(object).forEach((key) => {
		object[key].childNames.forEach((childKey) => {
			object[key].children.push(object[childKey])
			object[childKey].parent = key
		})
	})

	return object
}

const findRoot = (tree) => {
	return Object.keys(tree).filter((key) => (tree[key].parent === void 0)).shift()
}

const findUnbalanced = (tree) => {
	return Object.keys(tree).filter(key => (tree[key].isBalanced === false)).shift()
}

const answer1 = (input) => {
	const objectArray = input.map(parseInputLine)
	const flatObject = flattenArray(objectArray)
	const tree = constructTree(flatObject)
	return findRoot(tree)
}

const answer2 = (input) => {
	const objectArray = input.map(parseInputLine)
	const flatObject = flattenArray(objectArray)
	const tree = constructTree(flatObject)
	const unbalanced = findUnbalanced(tree)
	const unbalancedNodeInfo = tree[unbalanced].unbalancedNodeInfo

	const difference = unbalancedNodeInfo.mode - unbalancedNodeInfo.child.totalWeight
	return unbalancedNodeInfo.child.weight + difference
}

const sampleInput = [
	"pbga (66)",
	"xhth (57)",
	"ebii (61)",
	"havc (66)",
	"ktlj (57)",
	"fwft (72) -> ktlj, cntj, xhth",
	"qoyq (66)",
	"padx (45) -> pbga, havc, qoyq",
	"tknk (41) -> ugml, padx, fwft",
	"jptl (61)",
	"ugml (68) -> gyxo, ebii, jptl",
	"gyxo (61)",
	"cntj (57)"
]

// Run tests to confirm requirements have been met
advent.runTests([
	() => { assert.equal(answer1(sampleInput), "tknk") },
	() => { assert.equal(answer2(sampleInput), 60) }
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)