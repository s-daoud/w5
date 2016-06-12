// const readline = require('readline');
// const reader = readline.createInterface({
//
//   input: process.stdin,
//   output: process.stdout
// });

function Game() {
  this.stacks = [[3, 2, 1],[],[]];
}

Game.prototype.promptMove = function(reader, callback) {
  this.stacks.forEach(stack => console.log(stack));
  reader.question("Pick a start tower: ", function (startIdx) {
    reader.question("Pick a end tower:", function(endIdx) {
      return callback(startIdx, endIdx);
    });
  });
};

Game.prototype.isValidMove = function(startIdx, endIdx) {
  const startTower = this.stacks[startIdx];
  const endTower = this.stacks[endIdx];
  if (startIdx === endIdx) {
    return false;
  } else if (startTower.length === 0) {
    return false;
  } else if (endTower.length === 0) {
    return true;
  } else if (startTower[startTower.length - 1] < endTower[endTower.length - 1]) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.move = function (startIdx, endIdx) {
  console.log(startIdx);
  console.log(endIdx);
  if (this.isValidMove(startIdx, endIdx)) {
    const startTower = this.stacks[startIdx];
    const endTower = this.stacks[endIdx];
    endTower.push(startTower.pop());
    return true;
  } else {
    return false;
  }
};

Game.prototype.print = function () {
    console.log(this.stacks);
};

Game.prototype.isWon = function () {
  if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.run = function (reader, completionCallback) {

  this.promptMove(reader, (startIdx, endIdx) => {
    if (this.move(startIdx, endIdx)) {
      this.print();
    } else {
      console.log("Invalid Move!");
    }
    if (this.isWon()){
      completionCallback();
    } else {
      this.run(reader, completionCallback);
    }
  });
};

// let game1 = new Game();
// game1.promptMove(function(startIdx, endIdx) {
//   console.log(`${startIdx}  ${endIdx}`);
// });
// console.log(game1.move(0, 1));
// console.log(game1.stacks);
// console.log(game1.isValidMove(1, 0));
// console.log(game1.isValidMove(0, 0));
// console.log(game1.isWon());
// game1.run(function() {
//   console.log("You won!");
//   reader.close();
// });


// HanoiGame.prototype.run = function() {
//   //until either tower2 or tower3 has array.length === 3
//   // get move
//   // make move
//   // render
// }

module.exports = Game;
