/**
 * Day 8 Solution Part 2
 */
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
  const input = chunks.map(e => e.split('|'));
  let sum = 0;
  input.forEach(e => {
    let inputSignals = e[0].split(' ');
    let output = e[1].trim().split(' ');
    const one = inputSignals.find(e => e.length === 2).split('');
    const four = inputSignals.find(e => e.length === 4).split('');
    const seven = inputSignals.find(e => e.length === 3).split('');
    const eight = inputSignals.find(e => e.length === 7).split('');
    const _235 = inputSignals.filter(e => e.length === 5).map((signal) => signal.split(''));
    const _069 = inputSignals.filter(e => e.length === 6).map((signal) => signal.split(''));
    const tLeftMid = four.filter((signal) => !one.includes(signal));
    const three = _235.find((signal) => one.every((e) => signal.includes(e)));
    const _25 = _235.filter((signal) => signal !== three);
    const tLeft = tLeftMid.find((e) => !three.includes(e));
    const middle = tLeftMid.find((e) => e !== tLeft);
    const zero = _069.find((signal) => !signal.includes(middle));
    const _69 = _069.filter((signal) => signal !== zero);
    const nine = _69.find((signal) => one.every((e) => signal.includes(e)));
    const six = _69.find((signal) => signal !== nine);
    const two = _25.find((signal) => !signal.includes(tLeft));
    const five = _25.find((signal) => signal !== two);

    let newMap = {
      [zero.sort().join('')]: '0',
      [one.sort().join('')]: '1',
      [two.sort().join('')]: '2',
      [three.sort().join('')]: '3',
      [four.sort().join('')]: '4',
      [five.sort().join('')]: '5',
      [six.sort().join('')]: '6',
      [seven.sort().join('')]: '7',
      [eight.sort().join('')]: '8',
      [nine.sort().join('')]: '9',
    }
    
    output = output.map(e => e.split('').sort().join(''));
    const value = +output.map((signal) => newMap[signal]).join('');
    sum += value;
  })
  console.log(sum)

}