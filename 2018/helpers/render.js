"use strict";

// Private.

/**
 * Generate a Regular Expression that looks for {{KEY}} patterns.
 * @param {String} key the key that you want to search for
 * @returns {RegExp}
 */
const generateKeyRegEx = (key) => new RegExp(`\{\{${key}\}\}`, "ig");

// Public.

/**
 * Replace instances of {{KEY}} with the key value in the `variables` object.
 * @param {String} rawContent
 * @param {Object} variables
 * @returns {String}
 * @example
 * render("Hello {{name}}", { name: "Steve" });
 * // => "Hello Steve"
 */
const render = (rawContent, variables) => Object.keys(variables).reduce((content, key) =>
	content.replace(generateKeyRegEx(key), variables[key]),
rawContent);

module.exports = render;