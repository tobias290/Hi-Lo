const Game = require("./Game");

class GamesManager {
    /**
     * @private
     *
     * @type {Array<Game>}
     *
     * Manages all the games
     */
    games = [];

    /**
     * @public
     *
     * Creates a new game.
     *
     * @param {Player} players - Defaults starting players.
     *
     * @returns {string} - Return the game code of the new game.
     */
    createNewGame(...players) {
        let existingCodes = this.getGameCodes();
        let gameCode = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let validGameCode = false;

        while (!validGameCode) {
            for (let i = 0; i < 4; i++)
                gameCode += characters.charAt(Math.floor(Math.random() * characters.length));

            validGameCode = !existingCodes.includes(gameCode);
        }

        this.games.push(new Game(gameCode, ...players));

        return gameCode;
    }

    /**
     * @public
     *
     * Finds a game via its unique game code
     *
     * @param {string} code - Game code.
     *
     * @return {Game} - Returns the instance of the game.
     */
    findGame(code) {
        return this.games.find(game => game.gameCode === code);
    }

    /**
     * @private
     *
     * Lists over all current game and retrieve their game codes.
     *
     * @returns {Array<string>} - Returns the games codes.
     */
    getGameCodes() {
        return this.games.map(game => game.gameCode);
    }
}

module.exports = GamesManager;
