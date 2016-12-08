const childProcess = require('child_process')

const runScript = (scriptPath, callback) => {
    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false
    let process = childProcess.fork(scriptPath)

    // listen for errors as they may prevent the exit event from firing
    process.on("error", (err) => {
        if (invoked) { return }
        invoked = true
        callback(err)
    })

    // execute the callback once the process has finished running
    process.on("exit", (code) => {
        if (invoked) { return }
        invoked = true
        let err = (code === 0) ? null : new Error(`exit code ${code}`)
        callback(err)
    })
}

// Now we can run a script and invoke a callback when complete, e.g.
runScript('./day01/index.js', function (err) {
    if (err) throw err;
});

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
