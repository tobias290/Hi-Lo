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
     * Counts the number of rounds.
     *
     * @type {number}
     */
    currentRoundNumber = 0;

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
     * Checks to see if the player's name is not already a name of an existing player.
     *
     * @param {string} playerName - Name of the player.
     *
     * @returns {boolean} - Returns true if that name is allowed, false if not
     */
    isPlayerNameFree(playerName) {
        return this.players.every(player => player.name !== playerName);
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

    /**
     * @public
     *
     * Picks a starting card for the current player.
     *
     * @param {number} column - Cards column.
     * @param {number} row - Cards row.
     */
    pickCurrentPlayersStartingCard(column, row) {
        this.getCurrentPlayer().board.flipCardFaceUp(column, row);

        if (this.players[this.currentPlayerTurnIndex].board.noOfFaceUpCards() === 2)
            this.nextPlayersTurn();

        if (this.players.every(player => player.board.noOfFaceUpCards() === 2)) {
            this.currentPhase = GamePhase.PLAYER_TURN;

            if (this.currentRoundNumber > 1) {
                // Calculates which player has the highest visible score, that player starts the first round
                this.currentPlayerTurnIndex = this.players.indexOf(this.players.sort(
                    (a, b) => b.board.visibleScore() - a.board.visibleScore())[0]
                );
            }
        }
    }

    /**
     * Player draws a card into their hand.
     *
     * @param {boolean} fromDrawDeck - True if the player takes the card from the draw/stack deck. False if from the discard.
     */
    pickCurrentPlayersCard(fromDrawDeck) {
        this.getCurrentPlayer().takeCardIntoHand(fromDrawDeck ? this.stack.pop() : this.discard.pop());
    }

    /**
     * @public
     *
     * Places the card from the player's hand into their board.
     *
     * @param {number} column - Cards column.
     * @param {number} row - Cards row.
     */
    placeCardOnCurrentPlayersBoard(column, row) {
        let replacedCard = this.getCurrentPlayer().placeCardOnBoard(column, row);
        this.discard.push(replacedCard, true);
        this.nextPlayersTurn();
    }

    /**
     * @public
     *
     * Places the current player's card onto the discard pile.
     */
    placeCurrentPlayersCardOnDiscard() {
        this.discard.push(this.getCurrentPlayer().popCardFromHandForDiscard(), true);
    }

    /**
     * @public
     *
     * Flips a player's card when they put a card direction onto the discard.
     *
     *  @param {number} column - Cards column.
     * @param {number} row - Cards row.
     */
    flipCurrentsPlayersCard(column, row) {
        this.getCurrentPlayer().revealCard(column, row);
        this.nextPlayersTurn();
    }

    /**
     * Gets the current player.
     *
     * @returns {Player}
     */
    getCurrentPlayer() {
        return this.players[this.currentPlayerTurnIndex];
    }

    /**
     * @public
     *
     * Sets the current player to be the next player after the current.
     */
    nextPlayersTurn() {
        let cardsFromClearedRow = this.getCurrentPlayer().endTurn();

        if (cardsFromClearedRow !== null)
            cardsFromClearedRow.forEach(card => this.discard.push(card, true));

        if (this.currentPlayerTurnIndex >= this.players.length - 1) {
            this.currentPlayerTurnIndex = 0;
        } else {
            this.currentPlayerTurnIndex += 1;
        }

        if(this.checkRoundEnd())
            this.checkGameEnd();
    }


    /**
     * @public
     *
     * Starts a new game round.
     */
    startNewRound() {
        this.players.forEach(player => player.reset());
        this.currentRoundNumber += 1;
        this.start();
    }

    /**
     * @public
     *
     * Checks to see if a round has finished.
     */
    checkRoundEnd() {
        for (let player of this.players) {
            if (player.board.flattenCards().every(card => card.faceUp)) {
                this.currentPhase = GamePhase.ROUND_END;
                this.currentPlayerTurnIndex = this.players.indexOf(player);

                this.players.forEach(player => player.addVisibleScoreToOverallScore());
                return true;
            }
        }
        return false;
    }

    /**
     * @public
     *
     * Checks to see if the game has ended.
     */
    checkGameEnd() {
        if (this.players.some(player => player.overallScore >= 100)) {
            this.currentPhase = GamePhase.GAME_END;
            this.players.forEach(player => player.addVisibleScoreToOverallScore());
        }
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
            currentPlayerTurn: this.getCurrentPlayer(),
        }
    }
}

module.exports = Game;
