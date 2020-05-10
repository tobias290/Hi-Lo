const PlayerBoard = require("./PlayerBoard");

class Player {
    /**
     * @private
     *
     * Player's name.
     *
     * @type {string}
     */
    name = "";

    /**
     * @private
     *
     * The player's board. This holds of their cards.
     *
     * @type {PlayerBoard}
     */
    board = new PlayerBoard();

    /**
     * Player constructor
     *
     * @param {string} name - Name of the player.
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * @public
     *
     * Deals a card to the player
     *
     * @param {Card} card - Card delt to player.
     */
    dealCard(card) {
        this.board.addCard(card);
    }
}

module.exports = Player;
