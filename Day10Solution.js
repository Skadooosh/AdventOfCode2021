/**
 * Day 10 Advent Of Code
 * Problem Link: https://adventofcode.com/2021/day/10
 */
let fs = require("fs")
const readFileLines = filename =>
  fs.readFileSync(filename)
  .toString('UTF8')
  .split('\n');
let arr = readFileLines('input.txt');
process.stdin.resume();
process.stdin.setEncoding('utf8');
start();

function start() {
  const input = arr.filter(function (e) {
    return e
  }).map(e => e.split(''));
  const {
    totalSyntaxErrorScore,
    lines
  } = findTotalSyntaxScore(input);
  console.log("Part 1:", totalSyntaxErrorScore);
  console.log("Part 2:", FinishIncompleteStrings(input, lines));
}

// Part 1
function findTotalSyntaxScore(input) {
  const syntaxScore = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  }
  const map = {
    '<': '>',
    '[': ']',
    '{': '}',
    '(': ')'
  }
  const revMap = {
    '>': '<',
    ']': '[',
    '}': '{',
    ')': '('
  }
  let totalSyntaxErrorScore = 0
  let lines = [];
  for (let i = 0; i < input.length; i++) {
    let stack = [];
    for (let j = 0; j < input[i].length; j++) {
      if (map[input[i][j]]) {
        stack.push(input[i][j]);
      } else if (revMap[input[i][j]] === stack[stack.length - 1]) {
        stack.pop();
      } else {
        totalSyntaxErrorScore += syntaxScore[input[i][j]];
        lines.push(input[i])
        j = input[i].length;
      }
    }
  }
  return {
    totalSyntaxErrorScore,
    lines
  };
}

// Part 2
function FinishIncompleteStrings(input, corruptedLines) {
  const incorrectLines = input.filter(e => !corruptedLines.includes(e));
  const map = {
    '<': '>',
    '[': ']',
    '{': '}',
    '(': ')'
  }
  const scoreMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  const scores = incorrectLines
    .map((line) => {
      const stack = [];
      for (let char of line) {
        if (map[char]) stack.push(char);
        else {
          const lastOpen = stack.pop();
          if (map[lastOpen] !== char) return 0;
        }
      }
      let score = 0;
      while (stack.length) {
        const lastChar = stack.pop();
        score = score * 5 + scoreMap[map[lastChar]];
      }
      return score;
    })
    .filter((item) => item)
    .sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];

}