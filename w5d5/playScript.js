const Game = require('./tictactoe');

const readline = require('readline');
const reader = readline.createInterface({

  input: process.stdin,
  output: process.stdout
});

function completionCallback() {
  reader.question("Do you want to play again? ", (response) => {
    if (response === 'yes') {
      let newGame = new Game();
      newGame.run(reader, completionCallback);
    } else {
      console.log("BAIIII!");
      reader.close();
    }
  });
}



const game = new Game();
game.run(reader, completionCallback);
