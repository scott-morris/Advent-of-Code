// http://adventofcode.com/2016/day/13
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput(__dirname)
const assert = require("assert")

class Maze {
	constructor (input) {
		this.favoriteNumber = input
		this.maze = []
	}

	isWall (x, y) {
		let calc = (x*x) + (3*x) + (2*x*y) + (y) + (y*y) + this.favoriteNumber
		let binary = (calc >>> 0).toString(2)
		let numOnes = binary.split("").filter(l=>l==="1").length
		return (numOnes % 2 === 1)
	}

	buildMaze (rows, cols) {
		this.maze = []
		for (let y=0; y<rows; y++) {
			this.maze[y] = []
			for (let x=0; x<cols; x++) {
				this.maze[y][x] = (this.isWall(x,y)) ? "#" : "."
			}
		}
	}

	canMove (row, col) {
		return (this.maze[row][col] === ".") // not a wall, and not visited
	}

	movedTo (row, col) {
		this.maze[row][col] = "O"
	}

	showMaze () {
		return this.maze.map(row => row.join(""))
	}
}

class MazeSolver {
	constructor (x, y, targetX, targetY, maze) {
		this.moves = 0
		this.x = x
		this.y = y
		this.targetX = targetX
		this.targetY = targetY
		this.maze = maze
		this.choices = []

		this.maze.movedTo(this.x, this.y)
		this.updateCanMove()
	}

	updateCanMove () {
		this.canMove = {
			"up": (this.y > 0 && this.maze.canMove(this.y-1,this.x)),
			"down": this.maze.canMove(this.y+1,this.x),
			"left": (this.x > 0 && this.maze.canMove(this.y,this.x-1)),
			"right": this.maze.canMove(this.y,this.x+1)
		}
	}

	moved () {
		this.moves++
		this.maze.movedTo(this.x,this.y)
	}

	moveUp () {
		if (this.canMove.up) {
			this.y--
			this.moved()
		}
	}

	moveDown () {
		if (this.canMove.down) {
			this.y++
			this.moved()
		}
	}

	moveLeft () {
		if (this.canMove.left) {
			this.x--
			this.moved()
		}
	}

	moveRight () {
		if (this.canMove.right) {
			this.x++
			this.moved()
		}
	}
}

const answer1 = (input) => {
	const maze = new Maze(input)
}
const answer2 = (input) => {}

// Run tests to confirm requirements have been met
const testMaze = new Maze(10)
advent.runTests([
	() => {
		testMaze.buildMaze(7,10)
		assert.deepEqual(testMaze.showMaze(), [
			".#.####.##",
			"..#..#...#",
			"#....##...",
			"###.#.###.",
			".##..#..#.",
			"..##....#.",
			"#...##.###"
		])
	},
	() => {
		let testSolver = new MazeSolver(1,1,7,4,testMaze)
		assert.equal(testSolver.x, 1)
		assert.equal(testSolver.y, 1)
		assert.equal(testSolver.moves, 0)
		assert.equal(testMaze.maze[1].join(""), ".O#..#...#")
	}
])

advent.displayResults(answer1(input), answer2(input))
process.exit(0)