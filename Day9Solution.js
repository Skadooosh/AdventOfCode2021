/**
 * Problem link: https://adventofcode.com/2021/day/9
 * Includes both Part 1 and Part 2
 */

// Importing the fs module
let fs = require("fs")

// Intitializing the readFileLines with the file
const readFileLines = filename =>
  fs.readFileSync(filename)
  .toString('UTF8')
  .split('\n');

// Calling the readFiles function with file name
let arr = readFileLines('inputday9.txt');
process.stdin.resume();
process.stdin.setEncoding('utf8');
let basinArray;
start();

function start() {
  let sum = 0;
  basinArray = [];
  chunks = arr.filter(function (e) {
    return e
  });
  let input = chunks.map(e => e.split(''));
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if(hasNeighbourLow(i, j, input)) sum += Number(input[i][j]) + 1;
    }
  }
  basinArray = basinArray.sort(function (a, b) {
    return b - a
  });
  console.log("Part 1: ", sum)
  console.log("Part 2: ", basinArray[0] * basinArray[1] * basinArray[2]);
}

function hasNeighbourLow(x, y, input) {
  const point = Number(input[x][y]);
  let isLowPoint = true;
  if (x != 0 && point >= input[x - 1][y])
    isLowPoint = false;
  if (x != input.length - 1 && point >= input[x + 1][y])
    isLowPoint = false;
  if (y != 0 && point >= input[x][y - 1])
    isLowPoint = false;
  if (y != input[x].length - 1 && point >= input[x][y + 1])
    isLowPoint = false;

  // If it is lowpoint
  if (isLowPoint) {
    let visitedNodes = {};
    let len = 0;
    recursivelyFindBasin(input, x, y);
    function recursivelyFindBasin(input, x, y) {
      if (Number(input[x][y]) === 9) return;
      if (visitedNodes[x + '' + y]) return;
      visitedNodes[x + '' + y] = true;
      len++;
      if (x != 0 && !visitedNodes[(x - 1) + '' + y])
        recursivelyFindBasin(input, x - 1, y)
      if (x != input.length - 1 && !visitedNodes[(x + 1) + '' + y])
        recursivelyFindBasin(input, x + 1, y)
      if (y != 0 && !visitedNodes[x + '' + (y - 1)])
        recursivelyFindBasin(input, x, y - 1)
      if (y != input[x].length - 1 && !visitedNodes[x + '' + (y + 1)])
        recursivelyFindBasin(input, x, y + 1)
    }
    basinArray.push(len);
  }
  return isLowPoint;
}
