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
     * Current card that the player picked.
     *
     * @type {Card}
     */
    cardInHand = null;

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

    /**
     * @public
     *
     * Picks up a card and takes it into hand.
     *
     * @param {Card} card - Card picked up.
     */
    takeCardIntoHand(card) {
        this.cardInHand = card;
        this.cardInHand.flip(true);
        this.turnPhase = PlayerTurnPhase.PLACING_CARD;
    }

    /**
     * @public
     *
     * Places the card from the player's hand into their board
     *
     * @param {number} column - Cards column.
     * @param {number} row - Cards row.
     *
     * @returns {Card} - Returns the card the new card replaced.
     */
    placeCardOnBoard(column, row) {
        let replacedCard = this.board.replaceCard(this.cardInHand, column, row);
        this.cardInHand = null;
        this.turnPhase = PlayerTurnPhase.PICKING_CARD;
        return replacedCard;
    }

    /**
     * @public
     *
     * Returns the card in hand the sets it to null.
     *
     * @returns {Card} - Returns the current card in hand.
     */
    popCardFromHandForDiscard() {
        let cardInHand = this.cardInHand;
        this.cardInHand = null;
        this.turnPhase = PlayerTurnPhase.REVEAL_CARD;
        return cardInHand;
    }

    /**
     * Ends the player;s turn by setting their turn phase back to picking card.
     */
    endTurn() {
        this.turnPhase = PlayerTurnPhase.PICKING_CARD;
    }

    get name() {
        return this.name;
    }

    get isHost() {
        return this.isHost;
    }

    get cardInHand() {
        return this.cardInHand;
    }

    get turnPhase() {
        return this.turnPhase;
    }

    get board() {
        return this.board;
    }
}

module.exports = Player;
