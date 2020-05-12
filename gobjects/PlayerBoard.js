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
     * Gets the score of the player's board from all the face up cards.
     *
     * @returns {number} - Returns the player's score
     */
    visibleScore() {
        let score = 0;

        for (let card of this.flattenCards())
            if (card.faceUp)
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
            if (card.faceUp)
                count += 1;

        return count;
    }

    /**
     * @private
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
