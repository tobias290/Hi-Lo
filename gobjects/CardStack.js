const Card = require("./Card");

class CardStack {
    /**
     * @private
     *
     * Stack of cards
     *
     * @type {Array<Card>}
     */
    stack = [];

    /**
     * CardStack constructor.
     *
     * @param card_quantity_pair - List of objects containing a card instance and how many of that card should be in the deck.
     */
    constructor(...card_quantity_pair) {
        for (let pair of card_quantity_pair) {
            for (let i = 0; i < pair.quantity; i++) {
                this.stack.push(new Card(pair.card.value));
            }
        }
    }

    /**
     * @public
     *
     * Shuffles the deck.
     */
    shuffle() {
        // Using Fisher-Yates shuffle
        for (let i = this.stack.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
        }
    }

    /**
     * @public
     *
     * Returns the top card.
     *
     * @returns {Card}
     */
    pop() {
        return this.stack.pop();
    }

    /**
     * @public
     *
     * Add a card to the stack
     *
     * @param {Card} card - Card to add to stack
     * @param {boolean} faceUp - Flip the card to face up.
     */
    push(card, faceUp=false) {
        card.flip(faceUp);
        this.stack.push(card);
    }

    get length() {
        return this.stack.length;
    }
}

module.exports = CardStack;
