const PlayerBoard = require("./PlayerBoard");
const PlayerTurnPhase = require("./PlayerTurnPhase");

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
     * True if the player is the host of the game, false if not.
     *
     * @type {boolean}
     */
    isHost = false;

    /**
     * @private
     *
     * The player's board. This holds of their cards.
     *
     * @type {PlayerBoard}
     */
    board = new PlayerBoard();

    /**
     * @private
     *
     * Current phase of the player's turn.
     * If it is not their turn then it defaults to 'PICKING_CARD'.
     *
     * @type {number}
     */
    turnPhase = PlayerTurnPhase.PICKING_CARD;

    /**
     * Player constructor
     *
     * @param {string} name - Name of the player.
     * @param {boolean} isHost - True if this player is the host of a game
     */
    constructor(name, isHost = false) {
        this.name = name;
        this.isHost = isHost;
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

    get name() {
        return this.name;
    }

    get isHost() {
        return this.isHost;
    }

    get board() {
        return this.board;
    }
}

module.exports = Player;
