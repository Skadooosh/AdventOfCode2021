/**
 * Part 2 Solution
 */
process.stdin.resume();
process.stdin.setEncoding('utf8');

// your code goes here

// declare global variables
var input_stdin = "";
var chunks = "";
var input_currentline = 0;

// standard input is stored into input_stdin
process.stdin.on('data', function (data) {
  input_stdin += data;
});

// standard input is done and stored into an array
process.stdin.on('end', function () {
  chunks = input_stdin.split("\n");
  start();
});

function start() {
  chunks = chunks.filter(function (e) {
    return e
  });
  let map = {};
  let inputFish = chunks[0].split(',').map(e => Number(e)).sort()
  for (let i = 0; i < 9; i++) {
    map[i] = 0;
  }
  inputFish.forEach(fish => {
    if (!map[fish]) map[fish] = 1;
    else map[fish] += 1;
  })
  for (let i = 0; i < 256; i++) {
    let fish6 = map[6];
    let fish8 = map[0];
    for (key in map) {
      if (key != 0 && key != 6) {
        map[key - 1] = map[key];
        map[key] = 0;
      }
    }
    map[5] = fish6;
    map[6] += fish8;
    map[8] = fish8;
  }

  let sum = 0;
  for (let key in map) {
    sum += map[key]
  }
  console.log(sum);
}