import processData = require("./process-data");

test("Example #1", () => {
	expect(processData(["R8,U5,L5,D3","U7,R6,D4,L4"])).toEqual({
		wire1: [{ x: 8 }, { y: 5 }, { x: -5 }, { y: -3 }],
		wire2: [{ y: 7 }, { x: 6 }, { y: -4 }, { x: -4 }]
	});
});