module.exports = class Game {
    /**
     * @private
     *
     * The unique code to join this game.
     *
     * @type {string}
     */
    gameCode = "";

    /**
     * Players in this game.
     *
     * @type {Array<Player>}
     */
    players = [];

    /**
     * Game constructor.
     *
     * @param {string} code - Unique code of this game.
     * @param {Player} players - Defaults starting players.
     */
    constructor(code, ...players) {
        this.gameCode = code;
        this.players = players;
    }

    /**
     * @public
     *
     * Adds a new player to the game.
     *
     * @param {Player} player
     */
    addPlayer(player) {

    }

    get gameCode() {
        return this.gameCode;
    }

    get players() {
        return this.players;
    }
}
