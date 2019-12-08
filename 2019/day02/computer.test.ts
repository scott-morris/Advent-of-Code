// Imports.

import Computer = require("./computer");

// Tests.

describe("Step #1: Multi-step description", () => {
	let computer: Computer;

	beforeEach(() => {
		// Initialize with test data.
		computer = new Computer([1,9,10,3,2,3,11,0,99,30,40,50]);
	});

	it("First Cycle", () => {
		// Perform one cycle.
		computer.cycle();

		expect(computer.opCode).toEqual(1);
		expect(computer.callStack).toEqual([9,10,3]);
		expect(computer.state).toEqual([1,9,10,70,2,3,11,0,99,30,40,50])
	});

	it("Second Cycle", () => {
		// Perform one cycle.
		computer.cycle();
		computer.cycle();

		expect(computer.opCode).toEqual(2);
		expect(computer.callStack).toEqual([3,11,0]);
		expect(computer.state).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50])
	});
});

describe("Step #1: Additional Examples", () => {
	it("Example #1", () => {
		const computer = new Computer([1,0,0,0,99]);
		computer.run();
		expect(computer.state).toEqual([2,0,0,0,99])
	});

	it("Example #2", () => {
		const computer = new Computer([2,3,0,3,99]);
		computer.run();
		expect(computer.state).toEqual([2,3,0,6,99])
	});

	it("Example #3", () => {
		const computer = new Computer([2,4,4,5,99,0]);
		computer.run();
		expect(computer.state).toEqual([2,4,4,5,99,9801])
	});

	it("Example #4", () => {
		const computer = new Computer([1,1,1,4,99,5,6,0,99]);
		computer.run();
		expect(computer.state).toEqual([30,1,1,4,2,5,6,0,99])
	});
});