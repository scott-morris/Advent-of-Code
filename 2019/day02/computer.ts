export = class Computer {
	pointer: number;
	opCode: number;
	callStack: number[];
	private operations: object;
	private running: boolean;

	constructor (public state: number[]) {
		this.pointer = 0;
		this.operations = {
			1: this.add,
			2: this.multiply,
			99: this.stop
		};
	}

	add () {
		const [ addr1, addr2, addrOut ] = this.callStack;
		this.state[addrOut] = this.state[addr1] + this.state[addr2];
	}

	multiply () {
		const [ addr1, addr2, addrOut ] = this.callStack;
		this.state[addrOut] = this.state[addr1] * this.state[addr2];
	}

	cycle () {
		this.updateCallStack();

		if (this.operations.hasOwnProperty(this.opCode)) {
			this.operations[this.opCode].call(this);
		} else {
			console.warn(`Operation ${this.opCode} is undefined`);
		}
	}

	updateCallStack() {
		this.opCode = this.state[this.pointer];
		this.callStack = this.state.slice(this.pointer + 1, this.pointer + 4);
		this.pointer += 4;
	}

	stop () {
		this.running = false;
	}

	run () {
		this.running = true;

		while (this.running) {
			this.cycle();
		}
	}
}

interface Computer {
	pointer: number,
	opCode: number,
	callStack: number[],
	state: number[]
}