const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const units = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function hasWon(marker) {
  for (let unit of units) {
    let count = 0;
    for (let index of unit) {
      count = board[index] === marker ? ++count : count;
    }
    if (count === 3) return true;
  }
  return false;
}

function isDraw() {
  return board.every(tile => tile === "X" || tile === "O");
}

function printBoard() {
  console.log("\n " + board[0] + " | " + board[1] + " | " + board[2] + " ");
  console.log("-----------");
  console.log(" " + board[3] + " | " + board[4] + " | " + board[5] + " ");
  console.log("-----------");
  console.log(" " + board[6] + " | " + board[7] + " | " + board[8] + " \n");
}

function validMove(index) {
  return (
    board[index] !== "X" && board[index] !== "O" && board[index] !== undefined
  );
}

function updateGameState(choice, marker, player) {
  board[choice] = marker;
  if (hasWon(marker)) {
    printBoard();
    console.log(`${player} wins!`);
    return rl.close();
  }
  if (isDraw()) {
    printBoard();
    console.log("It's a draw!");
    return rl.close();
  }
  if (player === player1) {
    return nextTurn("O", player2);
  }
  return nextTurn("X", player1);
}

function nextTurn(marker, player) {
  printBoard();
  rl.question(
    `Select a tile by entering the corresponding number, ${player}: `,
    choice => {
      if (validMove(choice - 1)) {
        return updateGameState(choice - 1, marker, player);
      }
      console.log("\nInvalid move! Choose again.");
      return nextTurn(marker, player);
    }
  );
}

let player1, player2;

rl.question("What is your name, Player 1? ", name => {
  player1 = name;
  rl.question("What is your name, Player 2? ", name => {
    player2 = name;
    nextTurn("X", player1);
  });
});
