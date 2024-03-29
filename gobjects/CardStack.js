const Card = require("./Card");

class CardStack {
    /**
     * List of objects containing a card instance and how many of that card should be in the deck.
     * @type {*[]}
     */
    cardQuantityPair = []

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
     * @param cardQuantityPair - List of objects containing a card instance and how many of that card should be in the deck.
     */
    constructor(...cardQuantityPair) {
        this.cardQuantityPair = cardQuantityPair;
        this.createDeck();
    }

    /**
     * @public
     *
     * Creates a deck out of the given cards.
     *
     * @param {boolean} shuffle - If true it will shuffle the cards after creating the deck.
     */
    createDeck(shuffle=false) {
        for (let pair of this.cardQuantityPair) {
            for (let i = 0; i < pair.quantity; i++) {
                this.stack.push(new Card(pair.card.value));
            }
        }

        if (shuffle)
            this.shuffle();
    }

    /**
     * @public
     *
     * Clears and resets the deck.
     *
     * @param {boolean} shuffle - If true it will shuffle the cards after creating the deck.
     */
    resetStack(shuffle) {
        this.clear();
        this.createDeck(shuffle);
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

    /**
     * @public
     *
     * Clears the stack.
     */
    clear() {
        this.stack = [];
    }

    get length() {
        return this.stack.length;
    }

    toJSON() {
        return {
            stack: [...this.stack].reverse()
        }
    }
}

module.exports = CardStack;
