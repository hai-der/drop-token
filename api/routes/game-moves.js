const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');

// @route       GET /drop_token/:gameId/moves(?start=x&until=y)
// @desc        Get (sub) list of the moves played
// @access      Public
router.get('/:gameId/moves', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (!game) return res.status(404).json({ msg: 'Game not found' });
    if (!game.moves) return res.status(404).json({ msg: 'Moves not found' });

    const { start, until } = req.query; // optional query parameters

    if (start || until)
      return res.json({ moves: game.moves.slice(start, until) });

    res.json({ moves: game.moves });
  } catch (error) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Game not found' });
    res.status(400).send('Malformed request');
  }
});

// @route       GET /drop_token/:gameId/moves/:moveNumber
// @desc        Return a move
// @access      Public
router.get('/:gameId/moves/:moveNumber', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (!game) return res.status(404).json({ msg: 'Game not found' });

    const move = game.moves[req.params.moveNumber];

    if (!move) return res.status(404).json({ msg: 'Move not found' });

    res.json(move);
  } catch (error) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Game not found' });
    res.status(400).send('Malformed request');
  }
});

module.exports = router;
