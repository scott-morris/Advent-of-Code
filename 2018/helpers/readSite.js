"use strict";

// Libraries.

const puppeteer = require("puppeteer");
const TurndownService = require("turndown");
const turndownService = new TurndownService({ option: 'value' });

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

const readDescription = async ({ browser, year, day }) => {
	const url = `https://adventofcode.com/${year}/day/${day}`;

	const page = await browser.newPage();

	await setSessionCookie(page);

	await page.goto(url, { waitUntil: "networkidle2" });
	logger.log(`Navigated to ${url}`);

	const descHTML = await page.evaluate((sel) => {
		return document.querySelector(sel).innerHTML;
	}, "article.day-desc");
	logger.log(`Read HTML from ${url}`);

	const markdown = turndownService.turndown(descHTML);
	logger.log(`Converted HTML to markdown`);

	await page.close();

	return markdown;
};

const readInput = async ({ browser, year, day }) => {
	const url = `https://adventofcode.com/${year}/day/${day}/input`;

	const page = await browser.newPage();

	await setSessionCookie(page);

	await page.goto(url, { waitUntil: "networkidle2" });
	logger.log(`Navigated to ${url}`);

	const input = await page.evaluate((sel) => {
		return document.querySelector(sel).innerHTML;
	}, "body > pre");
	logger.log(`Read contents from ${url}`);

	await page.close();

	return input;
};

// Public.

const readSite = async (year, day) => {
	const browser = await puppeteer.launch();

	const options = {
		browser,
		year,
		day
	};

	const description = await readDescription(options);
	const input = await readInput(options);

	browser.close();

	return {
		description,
		input
	};
};

module.exports = readSite;