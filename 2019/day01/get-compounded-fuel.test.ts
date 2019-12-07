import getCompoundedFuel = require("./get-compounded-fuel");

test("run the test cases", () => {
	expect(getCompoundedFuel(14)).toEqual(2);
	expect(getCompoundedFuel(1969)).toEqual(966);
	expect(getCompoundedFuel(100756)).toEqual(50346);
});