const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');
const { createBoard } = require('../../utils/drop-token');

// @route       GET /drop_token/
// @desc        Return all in-progress games
// @access      Public
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({}, 'id');
    res.json({ games: games.map(game => game.id) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST /drop_token/
// @desc        Create new game
// @access      Public
router.post('/', async (req, res) => {
  try {
    const { rows, columns, players } = req.body;
    const newGame = new Game({
      rows,
      columns,
      players,
      status: 'IN_PROGRESS',
      state: createBoard(rows, columns)
    });

    const game = await newGame.save();

    res.json({ gameId: game.id });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Malformed request');
  }
});

// @route       GET /drop_token/:gameId
// @desc        Get the state of a game
// @access      Public
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId, {
      players: 1,
      status: 1,
      winner: 1,
      _id: 0
    });

    if (!game) return res.status(404).json({ msg: 'Game not found' });

    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Game not found' });
    res.status(400).send('Malformed request');
  }
});

module.exports = router;
