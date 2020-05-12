const CardStack = require("./CardStack");
const Card = require("./Card");
const GamePhase = require("./GamePhase");

class Game {
    /**
     * @private
     *
     * The unique code to join this game.
     *
     * @type {string}
     */
    gameCode = "";

    /**
     * @private
     *
     * Represents the current phase of the game.
     *
     * @type {number}
     */
    currentPhase = GamePhase.PLAYERS_JOINING;

    /**
     * @private
     *
     * Index of the current player.
     *
     * @type {number}
     */
    currentPlayerTurnIndex = 0;

    /**
     * @private
     *
     * Represents the stack of cards available.
     *
     * @type {CardStack}
     */
    stack = new CardStack(
        {
            card: new Card(-2),
            quantity: 5,
        },
        {
            card: new Card(-1),
            quantity: 10,
        },
        {
            card: new Card(0),
            quantity: 15,
        },
        {
            card: new Card(1),
            quantity: 10,
        },
        {
            card: new Card(2),
            quantity: 10,
        },
        {
            card: new Card(3),
            quantity: 10,
        },
        {
            card: new Card(4),
            quantity: 10,
        },
        {
            card: new Card(5),
            quantity: 10,
        },
        {
            card: new Card(6),
            quantity: 10,
        },
        {
            card: new Card(7),
            quantity: 10,
        },
        {
            card: new Card(8),
            quantity: 10,
        },
        {
            card: new Card(9),
            quantity: 10,
        },
        {
            card: new Card(10),
            quantity: 10,
        },
        {
            card: new Card(11),
            quantity: 10,
        },
        {
            card: new Card(12),
            quantity: 10,
        },
    );

    /**
     * @private
     *
     * Represents the discard pile.
     *
     * @type {CardStack}
     */
    discard = new CardStack();

    /**
     * @private
     *
     * Maximum number of players per game.
     *
     * @type {number}
     */
    MAX_NUMBER_OF_PLAYERS = 8;

    /**
     * @private
     *
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

        this.stack.shuffle();
    }

    /**
     * @public
     *
     * Checks the number of players in this game against the maximum allowed per game.
     *
     * @returns {boolean} - Returns true if that maximum number of players has been reached, false if not.
     */
    maxPlayerLimitReached() {
        return this.players.length >= this.MAX_NUMBER_OF_PLAYERS;
    }

    /**
     * @public
     *
     * Adds a new player to the game.
     *
     * @param {Player} player - New player to add to game.
     */
    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * @public
     *
     * Checks to make sure more than two players are in a game. If not then do not start the game.
     *
     * @returns {boolean} - Returns true if the game can be started. False if not.
     */
    canStartGame() {
        return this.players.length >= 2;
    }

    /**
     * @public
     *
     * Starts the game and deals cards to every player.
     */
    start() {
        for (let i = 0; i < this.players.length * 12; i++) {
            this.players[i % this.players.length].dealCard(this.stack.pop());
        }
        this.discard.push(this.stack.pop(), true);

        this.currentPhase = GamePhase.PLAYERS_PICKING_STARTING_CARDS;
    }

    /**
     * @public
     *
     * @returns {boolean} - Returns true if the game has started, false if not.
     */
    hasStarted() {
        return this.currentPhase !== GamePhase.PLAYERS_JOINING;
    }

    get gameCode() {
        return this.gameCode;
    }

    get currentPhase() {
        return this.currentPhase;
    }

    get players() {
        return this.players;
    }

    get stack() {
        return this.stack;
    }

    get discard() {
        return this.discard;
    }

    toJSON() {
        return {
            ...this,
            currentPlayerTurn: this.players[this.currentPlayerTurnIndex],
        }
    }
}

module.exports = Game;
