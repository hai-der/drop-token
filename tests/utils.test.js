const {
  createBoard,
  isValidColumn,
  getNextOpenRow,
  dropPiece,
  playerWon,
  isDraw
} = require('../utils/drop-token');

describe('Testing the game logic', () => {
  it('should create a binary matrix of 4 x 4', () => {
    expect(createBoard(4, 4)).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  it('should decide if column is full', () => {
    expect(
      isValidColumn(
        [
          [1, 0],
          [1, 0]
        ],
        0
      )
    ).toBe(false);
    expect(
      isValidColumn(
        [
          [0, 1],
          [0, 0]
        ],
        1
      )
    ).toBe(true);
  });

  it('should get first unoccupied row', () => {
    expect(
      getNextOpenRow(
        [
          [1, 2, 1],
          [2, 1, 2],
          [0, 1, 2]
        ],
        0
      )
    ).toBe(2);
  });

  it('should add piece to a row', () => {
    expect(
      dropPiece(
        [
          [0, 0],
          [0, 0]
        ],
        0,
        0,
        1
      )
    ).toStrictEqual([1, 0]);
  });

  it('should find a winner', () => {
    // horizontal
    expect(
      playerWon(
        [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        1
      )
    ).toBe(true);

    // vertical
    expect(
      playerWon(
        [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0]
        ],
        1
      )
    ).toBe(true);

    // positive diagonal
    expect(
      playerWon(
        [
          [0, 0, 0, 1],
          [0, 0, 1, 0],
          [0, 1, 0, 0],
          [1, 0, 0, 0]
        ],
        1
      )
    ).toBe(true);

    // negative diagonal
    expect(
      playerWon(
        [
          [1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]
        ],
        1
      )
    ).toBe(true);

    // full board (draw)
    expect(
      playerWon(
        [
          [1, 2, 2, 2],
          [1, 1, 1, 2],
          [2, 1, 2, 1],
          [1, 2, 2, 1]
        ],
        1
      )
    ).toBe(false);
  });

  it('should find a draw', () => {
    expect(
      isDraw([
        [1, 2, 2, 2],
        [1, 1, 1, 2],
        [2, 1, 2, 1],
        [1, 2, 2, 1]
      ])
    ).toBe(true);

    expect(
      isDraw([
        [1, 2, 2, 1],
        [1, 1, 1, 2],
        [2, 1, 2, 1],
        [0, 0, 1, 0]
      ])
    ).toBe(false);
  });
});
