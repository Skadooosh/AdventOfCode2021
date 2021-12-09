// Importing the fs module
let fs = require("fs")

// Intitializing the readFileLines with the file
const readFileLines = filename =>
  fs.readFileSync(filename)
  .toString('UTF8')
  .split('\n');

// Calling the readFiles function with file name
let arr = readFileLines('input.txt');
process.stdin.resume();
process.stdin.setEncoding('utf8');
start();

function start() {
  chunks = arr.filter(function (e) {
    return e
  });
  const input = chunks[0].split(',').map(e => Number(e));
  console.log(input)
  let minimumFuel = input[0];
  let minimumFuelCalculated = Infinity;
  let mean = Math.floor(input.reduce((a, b) => a + b) / input.length);
  for (let i = 0; i < input.length; i++) {
    let currentMinimum = 0;
    for (let j = 0; j < input.length; j++) {
      let n = Math.abs(mean - input[j]);
      if (n > 0)
        currentMinimum += (n * (n + 1)) / 2;
    }
    if (currentMinimum < minimumFuelCalculated) {
      minimumFuel = input[i]
    }
    minimumFuelCalculated = Math.min(currentMinimum, minimumFuelCalculated);
  }

  console.log(minimumFuel, minimumFuelCalculated)
}