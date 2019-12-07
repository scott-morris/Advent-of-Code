import getFuelRequired = require("./get-fuel-required");

test("run the test cases", () => {
	expect(getFuelRequired(12)).toEqual(2);
	expect(getFuelRequired(14)).toEqual(2);
	expect(getFuelRequired(1969)).toEqual(654);
	expect(getFuelRequired(100756)).toEqual(33583);
});

test("additional test cases", () => {
	expect(getFuelRequired(2)).toEqual(0);
});