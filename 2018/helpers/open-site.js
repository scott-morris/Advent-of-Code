"use strict";

// Libraries.

const puppeteer = require("puppeteer");

// Dependencies.

const logger = require("./logger");

// Constants.

const SESSION_COOKIE = require("../.creds.js").sessionCookie;

// Private.

const setSessionCookie = async(page) => {
	logger.log(`Setting session cookie`);
	await page.setCookie({
		name: "session",
		value: SESSION_COOKIE,
		domain: ".adventofcode.com"
	});
};

// Public.

const openSite = async (year, day) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await setSessionCookie(page);

	return {
		browser,
		page
	};
};

module.exports = openSite;