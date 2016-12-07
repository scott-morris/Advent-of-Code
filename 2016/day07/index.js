// http://adventofcode.com/2016/day/7
"use strict"

const advent = require("../lib/advent.js")
const input = advent.getInput()
const assert = require("assert")

const regExps = {
	// (?=(\d{3}))\d
	abba: /([a-z])([a-z])\2\1/ig,
	aba: /([a-z])([a-z])\1/ig,
	sameFour: /([a-z])\1{3}/,
	sameThree: /([a-z])\1{2}/,
	hypernets: /\[[a-z]+\]/ig
}

let verbose = false

const oneWithoutTheOther = (str, regEx1, regEx2) => {
	let firstList = str.match(regEx1) || []
	return firstList.filter(item => !regEx2.test(item))
}

const getABBAlist = str => oneWithoutTheOther(str, regExps.abba, regExps.sameFour)
const getABAlist = str => {
	// let's walk the string to get the list since RegEx gets weird with overlaps
	let abaList = []
	for (let i = 0; i <= (str.length - 3); i++) {
		let sub = str.substr(i,3)
		if (sub.charAt(0) !== sub.charAt(1) && sub.charAt(0) === sub.charAt(2)) {
			abaList.push(sub)
		}
	}
	return abaList
}

const hasValidABBA = str => (getABBAlist(str).length > 0)
const hasValidABA = str => (getABAlist(str).length > 0)

class IPv7 {
	constructor (ip) {
		this.hypernets = ip.match(regExps.hypernets) || []
		this.supernets = ip.replace(regExps.hypernets, ",").split(",")

		this.hypernets = this.hypernets.map(hn => hn.replace("[","").replace("]",""))
	}

	supportsTLS () {
		let supernetsMatch = this.supernets.some(sn => hasValidABBA(sn))
		let hypernetsMatch = this.hypernets.some(hn => hasValidABBA(hn))

		return (supernetsMatch && !hypernetsMatch)
	}

	supportsSSL () {
		if (!this.hypernets.some(hn => hasValidABA(hn)) ||
			!this.supernets.some(sn => hasValidABA(sn))) {
			return false
		}

		let abaSet = new Set()
		let babSet = new Set()

		this.supernets.forEach(sn => { getABAlist(sn).forEach(aba => { abaSet.add(aba) }) })
		this.hypernets.forEach(hn => { getABAlist(hn).forEach(bab => { babSet.add(bab) }) })

		return Array.from(abaSet).some(aba => babSet.has(`${aba.charAt(1)}${aba.charAt(0)}${aba.charAt(1)}`))
	}
}

const answer1 = (inputIP) => inputIP.filter(ip => ip.supportsTLS()).length
const answer2 = (inputIP) => inputIP.filter(ip => ip.supportsSSL()).length

// Run tests to confirm requirements have been met
advent.runTests([
	// PHASE ONE
	() => { assert.equal(new IPv7("abba[mnop]qrst").supportsTLS(), true) },
	() => { assert.equal(new IPv7("abcd[bddb]xyyx").supportsTLS(), false) },
	() => { assert.equal(new IPv7("aaaa[qwer]tyui").supportsTLS(), false) },
	() => { assert.equal(new IPv7("ioxxoj[asdfgh]zxcvbn").supportsTLS(), true) },
	// PHASE TWO
	() => { assert.equal(new IPv7("aba[bab]xyz").supportsSSL(), true) },
	() => { assert.equal(new IPv7("xyx[xyx]xyx").supportsSSL(), false) },
	() => { assert.equal(new IPv7("aaa[kek]eke").supportsSSL(), true) },
	() => { assert.equal(new IPv7("zazbz[bzb]cdb").supportsSSL(), true) }
])

const inputIPs = input.map(ip => new IPv7(ip))
advent.displayResults(answer1(inputIPs), answer2(inputIPs))
process.exit(0)