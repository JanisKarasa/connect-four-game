// DOM Variables

// getting all buttons
let buttons = document.getElementsByClassName("btn");
// getting reset button
let reset = document.getElementById("reset-btn");
// getting player type (player-1, player-2)
let playerType = document.getElementById("player-type");

// Game Flow Variables

let playerNumber = 1; // Initially player - 1 gets to start his/her turn

let filledGrid = []; // Player board

let filledCells = 0; // No. of cells that has been filled

for (let i = 0; i < 6; i++) {
  let arr = [-1, -1, -1, -1, -1, -1, -1]; // Board is initialized with -1
  filledGrid.push(arr);
}

// Event Listener for Buttons

reset.addEventListener("click", function () {
  resetBoard();
});

// Function to reset the Board completely
function resetBoard() {
  // Remove all the disabled buttons and the styles

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.remove("btn-player-1");
    buttons[i].classList.remove("btn-player-2");
  }

  // Player Number is changed to 1

  playerNumber = 1;
  playerType.textContent = "Player - 1";

  // Filled Cells is changed to 0

  filledCells = 0;

  // Filling the Board with -1

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      filledGrid[i][j] = -1;
    }
  }
}

for (let i = 0; i < buttons.length; i++) {
  // Handing the Event when button was clicked

  buttons[i].addEventListener("click", function () {
    // Make move and disable the button to avoid further clicking it again

    let buttonNo = this.classList[1];
    makeMove(this, buttonNo.slice(4));
  });
}

// Function to Make Move on the passed button and disable it
// This function is called when a player makes a move by clicking a grid cell button
function makeMove(button, buttonNo) {
  // It determines the row and column of the clicked cell, updates the game board, and checks for a win
  let row =
    buttonNo % 7 === 0
      ? Math.floor(buttonNo / 7) - 1
      : Math.floor(buttonNo / 7);
  let col = buttonNo % 7 === 0 ? 6 : (buttonNo % 7) - 1;

  if (playerNumber === 1) {
    button.classList.add("btn-player-1");

    filledGrid[row][col] = 1;
    filledCells++;

    // If a player wins, it displays an alert and resets the board
    if (playerWon(row, col, 1) === true) {
      setTimeout(function () {
        alert("Game Over: Green Wins");
        resetBoard();
      }, 200);
    }

    // Update the player
    playerNumber = 2;
    playerType.textContent = "Player - 2";
  } else {
    button.classList.add("btn-player-2");

    filledGrid[row][col] = 2;
    filledCells++;

    if (playerWon(row, col, 2) === true) {
      setTimeout(function () {
        alert("Game Over : Red Wins");
        resetBoard();
      }, 200);
    }

    // Update the player
    playerNumber = 1;
    playerType.textContent = "Player - 1";
  }

  // If all cells are filled and no player has won, it displays a draw alert
  if (filledCells === 42) {
    setTimeout(function () {
      alert("Game Draw");
      resetBoard();
    }, 200);
    return;
  }

  // Disable the button is the move is made
  setTimeout(function () {
    button.disabled = true;
  }, 10);
}

// playerWon Function
function playerWon(row, col, player) {
  let count = 0;

  // Checks if the current player has won by checking for four consecutive cells in a row, column, or diagonal
  // Check for columns

  for (let i = 0; i < 7; i++) {
    if (filledGrid[row][i] === player) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }

  count = 0;

  // Check for Rows

  for (let i = 0; i < 6; i++) {
    if (filledGrid[i][col] === player) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }

  count = 0;

  // Check for primary diagonal

  if (row >= col) {
    let i = row - col;
    let j = 0;

    for (; i <= 5; i++, j++) {
      if (filledGrid[i][j] === player) {
        count++;
        if (count == 4) return true;
      } else {
        count = 0;
      }
    }
  } else {
    let i = 0;
    let j = col - row;

    for (; j <= 6; i++, j++) {
      if (filledGrid[i][j] === player) {
        count++;
        if (count == 4) return true;
      } else {
        count = 0;
      }
    }
  }

  count = 0;

  // Check for secondary diagonal

  if (row + col <= 5) {
    let i = row + col;
    let j = 0;

    for (; i >= 0 && j <= row + col; i--, j++) {
      if (filledGrid[i][j] === player) {
        count++;
        if (count == 4) return true;
      } else {
        count = 0;
      }
    }
  } else {
    let i = 5;
    let j = row + col - 5;

    for (; j <= 6; j++, i--) {
      if (filledGrid[i][j] === player) {
        count++;
        if (count == 4) return true;
      } else {
        count = 0;
      }
    }
  }
  return false;
}
