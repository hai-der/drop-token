const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = new Schema(
  {
    action: { type: String, required: true },
    player: { type: String, required: true },
    column: {
      type: Number,
      enum: [0, 1, 2, 3], // ensures column is within bounds
      required: function() {
        return this.action === 'MOVE'; // ensures column is attached when action is 'MOVE'
      }
    }
  },
  { _id: false }
);

const gameSchema = new Schema({
  rows: {
    type: Number,
    min: [4, 'Rows must be greater than or equal to 4'],
    required: true
  },
  columns: {
    type: Number,
    min: [4, ' Columns must be greater than or equal to 4'],
    required: true
  },
  status: { type: String, required: true },
  state: [Array],
  players: [String],
  moves: [moveSchema],
  winner: String
});

module.exports = Game = mongoose.model('game', gameSchema);
