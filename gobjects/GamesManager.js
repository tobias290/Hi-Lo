let Game = require("./Game");

module.exports = class GamesManager {
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
     * @returns {string} - Return the game code of the new game.
     */
    createNewGame() {
        let existingCodes = this.getGameCodes();
        let gameCode = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let validGameCode = false;

        while (!validGameCode) {
            for (let i = 0; i < 4; i++)
                gameCode += characters.charAt(Math.floor(Math.random() * characters.length));

            validGameCode = !existingCodes.includes(gameCode);
        }

        this.games.push(new Game(gameCode));

        return gameCode;
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
