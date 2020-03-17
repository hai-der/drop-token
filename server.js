const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running...'));

// define routes
app.use('/drop_token', require('./api/routes/game.js'));
app.use('/drop_token', require('./api/routes/game-moves.js'));
app.use('/drop_token', require('./api/routes/game-actions.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
