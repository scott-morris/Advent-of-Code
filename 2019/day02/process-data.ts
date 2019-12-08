
const processData = (data: string[]) => {
	const firstString: string = data[0];
	const arrayOfStrings: string[] = firstString.split(",");
	const arrayOfNumbers: number[] = arrayOfStrings.map(Number);
	return arrayOfNumbers;
}

export = processData;