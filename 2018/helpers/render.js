"use strict";

const render = (rawContent, variables) => Object.keys(variables).reduce((content, key) =>
	content.replace(`{{${key}}}`, variables[key]),
rawContent);

module.exports = render;