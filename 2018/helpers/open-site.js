"use strict";

// Libraries.

const puppeteer = require("puppeteer");

// Dependencies.

const logger = require("./logger");

// Constants.

const SESSION_COOKIE = require("../.creds.js").sessionCookie;

// Private.

/**
 * Set the AoC cookie to the value stored in the `.creds.js` file.
 * @param {Object} page
 */
const setSessionCookie = async(page) => {
	logger.log(`Setting session cookie`);
	await page.setCookie({
		name: "session",
		value: SESSION_COOKIE,
		domain: ".adventofcode.com"
	});
};

// Public.

/**
 * Open a new instance of a Puppeteer browser and set the AoC
 * cookie to the designated value.
 * @returns {Object}
 *
 */
const openSite = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await setSessionCookie(page);

	return {
		browser,
		page
	};
};

module.exports = openSite;