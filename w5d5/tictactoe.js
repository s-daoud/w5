function Board() {
  this.grid = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
}

Board.prototype.won = function(currentPlayer) {
  if (this.grid[0][0] === this.grid[1][1] &&
    this.grid[1][1] === this.grid[2][2] &&
    this.grid[0][0] !== "_") {
    return true;
  }
  if (this.grid[0][2] === this.grid[1][1] &&
    this.grid[1][1] === this.grid[2][0] &&
    this.grid[0][2] !== "_") {
    return true;
  }
  for(let i = 0; i < this.grid.length; i++) {
    if (this.grid[i].every((el) => el === currentPlayer.symbol)) {
      return true;
    }
  }
  function transpose(array)
  {
    return array[0].map(function (_, column) {
      return array.map(function (row) {
        return row[column];
      });
    });
  }
  let transposed = transpose(this.grid);
  for(let i = 0; i < transposed.length; i++) {
    if (transposed[i].every((el) => el === currentPlayer.symbol)) {
      return true;
    }
  }
};

Board.prototype.winner = function(currentPlayer) {
  return currentPlayer.name;
};

Board.prototype.empty = function(row, column) {
  return (this.grid[row][column] === "_");
};

Board.prototype.placeMark = function(row, column, mark) {
  if (this.empty(row, column)) {
    this.grid[row][column] = mark;
    return true;
  } else {
    return false;
  }
};

Board.prototype.render = function () {
  console.log(`${this.grid[0].join('|')}\n${this.grid[1].join('|')}\n${this.grid[2].join('|')}`);
};

function Game(playerOne = new HumanPlayer("A", "x"), playerTwo = new HumanPlayer("B", "o")) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.currentPlayer = playerOne;
  this.board = new Board();
}

Game.prototype.run = function(reader, completionCallback) {
  this.board.render();
  this.currentPlayer.promptMove(reader, (row, column) => {
    if (this.board.placeMark(row, column, this.currentPlayer.symbol)) {
    } else {
      console.log("Invalid Move!");
    }
    if (this.board.won(this.currentPlayer)){
      this.board.render();
      console.log(`${this.board.winner(this.currentPlayer)} wins!`);
      completionCallback();
    } else {
      this.switch_player();
      this.run(reader, completionCallback);
    }
  });
};

Game.prototype.switch_player = function () {
  if (this.current_player === this.playerOne) {
    this.current_player = this.playerTwo;
  } else {
    this.current_player = this.playerOne;
  }
};

function HumanPlayer(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

HumanPlayer.prototype.promptMove = function (reader, callback) {
  reader.question("Pick a row: ", function (row) {
    reader.question("Pick a column:", function(column) {
      return callback(row, column, this.symbol);
    });
  });
};

module.exports = Game;
