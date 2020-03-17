// build two-dimensional array
function createBoard(rows, cols) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

// checks final row to determine if column is full
function isValidColumn(board, col) {
  return board[board.length - 1][col] === 0;
}

// returns first empty row in column
function getNextOpenRow(board, col) {
  for (let row = 0; row < board.length; row++) {
    if (board[row][col] === 0) return row;
  }
}

function dropPiece(board, row, col, piece) {
  board[row][col] = piece;
  return board[row];
}

function isDraw(board) {
  for (let col = 0; col < board[0].length; col++) {
    for (let row = 0; row < board.length; row++) {
      if (board[row][col] === 0) return false;
    }
  }
  return true;
}

function playerWon(board, piece) {
  // check horizontal cells
  for (let col = 0; col < board[0].length - 3; col++) {
    for (let row = 0; row < board.length; row++) {
      if (
        board[row][col] === piece &&
        board[row][col + 1] === piece &&
        board[row][col + 2] === piece &&
        board[row][col + 3] === piece
      )
        return true;
    }
  }

  // check vertical cells
  for (let col = 0; col < board[0].length; col++) {
    for (let row = 0; row < board.length - 3; row++) {
      if (
        board[row][col] === piece &&
        board[row + 1][col] === piece &&
        board[row + 2][col] === piece &&
        board[row + 3][col] === piece
      )
        return true;
    }
  }

  // check positively sloped diagonal
  for (let col = 0; col < board[0].length - 3; col++) {
    for (let row = 0; row < board.length - 3; row++) {
      if (
        board[row][col] === piece &&
        board[row + 1][col + 1] === piece &&
        board[row + 2][col + 2] === piece &&
        board[row + 3][col + 3] === piece
      )
        return true;
    }
  }

  // check negatively sloped diagonal
  for (let col = 0; col < board[0].length - 3; col++) {
    for (let row = 3; row < board.length; row++) {
      if (
        board[row][col] === piece &&
        board[row - 1][col + 1] === piece &&
        board[row - 2][col + 2] === piece &&
        board[row - 3][col + 3] === piece
      )
        return true;
    }
  }
  return false;
}

module.exports = {
  createBoard,
  isValidColumn,
  getNextOpenRow,
  dropPiece,
  playerWon,
  isDraw
};
