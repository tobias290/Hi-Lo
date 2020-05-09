module.exports = class Game {
    /**
     * @private
     *
     * The unique code to join this game.
     *
     * @type {string}
     */
    gameCode = "";

    constructor(code) {
        this.gameCode = code;
    }

    get gameCode() {
        return this.gameCode;
    }
}
