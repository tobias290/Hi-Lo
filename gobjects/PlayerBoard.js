const Card = require("./Card");

class PlayerBoard {
    /**
     * @private
     *
     * Player's boards made up of four columns of three.
     *
     * @type {Array<Array<Card>>}
     */
    cards = [[], [], [], []];

    /**
     * @public
     *
     * Resets the player's cards.
     */
    resetBoard() {
        this.cards = [[], [], [], []];
    }

    /**
     * @public
     *
     * @param {Card} card - Card to add to board.
     */
    addCard(card) {
        let column = 0;

        if (this.cards[0].length === 3)
            column = 1;
            if (this.cards[1].length === 3)
                column = 2;
                if (this.cards[2].length === 3)
                    column = 3

        this.cards[column].push(card);
    }

    /**
     * @public
     *
     * Replaces a card.
     *
     * @param {Card} card - Card to replace.
     * @param {number} column - Cards column.
     * @param {number} row - Cards row.
     */
    replaceCard(card, column, row) {
        let replacedCard = this.cards[column][row];
        this.cards[column][row] = card;
        return replacedCard;
    }

    /**
     * @public
     *
     * Gets the score of the player's board from all the face up cards.
     *
     * @returns {number} - Returns the player's score
     */
    visibleScore() {
        let score = 0;

        for (let card of this.flattenCards())
            if (card.faceUp && card.value !== "empty")
                score += card.value;

        return score;
    }

    /**
     * @public
     *
     * Returns the number of face-up cards in the player's board.
     *
     * @returns {number} - Returns the number of face-up cards.
     */
    noOfFaceUpCards() {
        let count = 0;

        for (let card of this.flattenCards())
            if (card.faceUp && card.value !== "empty")
                count += 1;

        return count;
    }

    /**
     * @public
     *
     * @returns {Card[]} - Returns a single dimension array of the cards.
     */
    flattenCards() {
        return this.cards.flat();
    }

    /**
     * FLips a card to its face up side.
     *
     * @param {number} column - Cards column.
     * @param {number} row - Cards row.
     */
    flipCardFaceUp(column, row) {
        this.cards[column][row].flip(true);
    }

    /**
     * Checks to see if a column as all the game cards is so clear that column.
     *
     * @returns {Array<Card> | null} - Returns the cleared cards so they can be added to the discard, or null if no column was cleared
     */
    checkForMatchingColumn() {
        let clearedCards = [];

        for (let columnIndex in this.cards) {
            if (this.cards[columnIndex].every(card => card.value === this.cards[columnIndex][0].value && card.faceUp)) {
                for (let cardIndex in this.cards[columnIndex]) {
                    clearedCards.push(new Card(this.cards[columnIndex][cardIndex].value, true));
                    this.cards[columnIndex][cardIndex].value = "empty";
                }
            }
        }
        return clearedCards.length !== 0 ? clearedCards : null;
    }

    get cards() {
        return this.cards;
    }

    toJSON() {
        return {
            ...this,
            visibleScore: this.visibleScore(),
            noOfFaceUpCards: this.noOfFaceUpCards(),
        }
    }
}

module.exports = PlayerBoard;
