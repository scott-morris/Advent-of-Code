"use strict";

// Libraries.

const puppeteer = require("puppeteer");
const TurndownService = require("turndown");
const turndownService = new TurndownService({ option: 'value' });

// Dependencies.

const logger = require("./logger");
const openSite = require("./open-site");

// Private.

const readDescription = async ({ page, year, day }) => {
	const url = `https://adventofcode.com/${year}/day/${day}`;

	await page.goto(url, { waitUntil: "networkidle2" });
	logger.log(`Navigated to ${url}`);

	const descHTML = await page.evaluate((sel) => {
		const descriptions = [];
		document.querySelectorAll(sel).forEach((ele) =>
			descriptions.push(ele.innerHTML));
		return descriptions;
	}, "article.day-desc");
	logger.log(`Read HTML Descriptions from ${url}`);

	const markdown = descHTML.map((html) => turndownService.turndown(html));
	logger.log(`Converted HTML to markdown`);

	return markdown;
};

const readInput = async ({ page, year, day }) => {
	const url = `https://adventofcode.com/${year}/day/${day}/input`;

	await page.goto(url, { waitUntil: "networkidle2" });
	logger.log(`Navigated to ${url}`);

	const input = await page.evaluate((sel) => {
		return document.querySelector(sel).innerText.replace(/\n$/, "");
	}, "body > pre");
	logger.log(`Read contents from ${url}`);

	return input;
};

// Public.

const readSite = async (year, day) => {
	const { browser, page } = await openSite();

	const options = {
		page,
		year,
		day
	};

	const [description1, description2] = await readDescription(options);
	const input = await readInput(options);

	page.close();
	browser.close();

	return {
		description1,
		description2,
		input
	};
};

module.exports = readSite;