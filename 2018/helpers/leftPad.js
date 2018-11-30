"use strict";

/**
 * Add padding to the left of a string if necessary
 * @param {String} string the given string to pad
 * @param {Number} [length=2] the minimum length you want the string to be
 * @param {String} [padWith="0"] the string you want to use to pad with
 */
const leftPad = (string, length = 2, padWith = "0") =>
	string.length >= length ?
		string :
		`${padWith.repeat(length)}${string}`.substr((Math.abs(length) * -1));

module.exports = leftPad;