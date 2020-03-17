const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');
const {
  isValidColumn,
  getNextOpenRow,
  dropPiece,
  playerWon,
  isDraw
} = require('../../utils/drop-token');

// @route       POST /drop_token/:gameId/:playerId
// @desc        Submit a move
// @access      Public
router.post('/:gameId/:playerId', async (req, res) => {
  try {
    const { column } = req.body;
    const { gameId, playerId } = req.params;

    const game = await Game.findById(gameId);

    if (!game) return res.status(404).json({ msg: 'Game not found' });

    const { players, state, moves } = game;

    // checks playerId submitted against players in database
    const playerIsAllowed = players.some(player => player === playerId);

    if (!playerIsAllowed)
      return res.status(404).json({ msg: 'Player is not part of game' });
    if (game.status === 'DONE')
      return res.status(410).json({ msg: 'Game is already finished' });

    // player who submitted the most recent move
    let lastMove = null;
    if (moves.length > 0) {
      lastMove = moves[moves.length - 1].player;
    }

    if (lastMove === playerId)
      return res
        .status(409)
        .json({ msg: "Player tried to post when it's not their turn" });

    if (!isValidColumn(state, column))
      return res.status(400).json({ msg: 'Illegal move' });

    // last letter of playerId used as game Token
    const row = getNextOpenRow(state, column);
    const playerIndex = players.indexOf(playerId);
    const playerToken = playerIndex + 1;
    const updatedRow = dropPiece(state, row, column, playerToken);

    // update board
    game.state.set(row, updatedRow);

    const newMove = {
      action: 'MOVE',
      player: playerId,
      column
    };

    game.moves.push(newMove);

    // identify winning state
    if (playerWon(game.state, playerIndex + 1)) {
      game.winner = players[playerIndex];
    } else if (isDraw(game.state)) {
      game.winner = null;
    } else if (players.length === 1) {
      game.winner = players[0];
    }

    if (game.winner) game.status = 'DONE';

    await game.save();

    res.json({ move: `${gameId}/moves/${game.moves.length - 1}` });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Game not found' });
    res.status(400).send('Malformed request');
  }
});

// @route       DELETE /drop_token/:gameId/:playerId
// @desc        Player quits from game
// @access      Public
router.delete('/:gameId/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;
    const game = await Game.findById(req.params.gameId);

    if (!game) return res.status(404).json({ msg: 'Game not found' });

    const playerIsAllowed = game.players.some(player => player === playerId);

    if (!playerIsAllowed)
      return res.status(404).json({ msg: 'Player is not part of game' });

    if (game.status === 'DONE')
      return res.status(410).json({ msg: 'Game is already finished' });

    const newMove = {
      action: 'QUIT',
      player: playerId
    };

    game.moves.push(newMove);

    // returns first player in array that does not match playerId passed through request parameters
    const winner = game.players.find(player => player !== playerId);

    game.winner = winner;
    game.status = 'DONE';

    await game.save();
    res.status(202).end();
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Game not found' });
    res.status(400).send('Malformed request');
  }
});

module.exports = router;
