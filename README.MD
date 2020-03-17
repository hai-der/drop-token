# Drop-Token

A REST web-service that allows players to create Drop Token games, post moves, query moves, and get state of the games. Takes places on a 4x4 grid and functions just like Connect 4. That is, a token is dropped along a column and said token goes to the lowest unoccupied row of the board. A player wins when they have 4 tokens next to each other either along a row, in a column, or on a diagonal. If the board is filled, and nobody has won then the game is a draw. Each player takes a turn, starting with player 1, until the game reaches either win or draw. If a player tries to put a token in a column that is already full, that results in an error state, and the player must play again until the play a valid move.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You must have Node.js installed to run this program. Find it here: https://nodejs.org/en/.

### Installation

Clone the repo and navigate to the root folder of the project. Assuming you are running MacOS, type `npm install` into your terminal to install all the packages the program depends on.

To run a suite of unit tests, type `npm test` in your console.

To run an instance of the web service, simply type `npm run start`.

Then, navigate to any of the following endpoints in Postman or a web browser.

- GET /drop_token
- POST /drop_token
- GET /drop_token/{gameId}
- GET /drop_token/{gameId}/moves
- POST /drop_token/{gameId}/{playerId}
- GET /drop_token/{gameId}/moves/{move_number}
- DELETE /drop_token/{gameId}/{playerId}
