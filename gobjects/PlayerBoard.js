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

    get cards() {
        return this.cards;
    }
}

module.exports = PlayerBoard;
