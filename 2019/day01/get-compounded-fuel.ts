import getFuelRequired = require("./get-fuel-required");

/**
 * For each module mass, calculate its fuel and add it to the total.
 * Then, treat the fuel amount you just calculated as the input mass
 * and repeat the process, continuing until a fuel requirement is
 * zero or negative.
 */
function getCompoundedFuel(mass: number):number {
	let iteration:number = getFuelRequired(mass);
	let sum:number = 0;

	do {
		sum += iteration;
		iteration = getFuelRequired(iteration);
	} while (iteration > 0);

    return sum;
}

export = getCompoundedFuel;