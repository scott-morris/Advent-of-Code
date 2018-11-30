# Advent of Code 2018

This year, I've made myself some useful helpers to get things
scaffolded.

To get started, you'll need to create a local `/2018/.creds.js` file
with the following signature:

```
module.exports = {
	sessionCookie: "PUT YOUR COOKIE VALUE HERE"
};
```

Then, install the npm packages and initialize the day you want
to work on.

```
cd 2018
npm i
npm run init {{day}}
```

It will create three files into the `/2018/day##` folder:
* `index.js` - this is where you'll figure out your solution.
* `input.txt` - this will contain your specific inputs.
* `readme.md` - this will contain information about the challenge.

To run a particular day, you can run it with npm:

```
npm run day {{day}}
```