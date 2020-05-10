class Card {
    /**
     * @private
     *
     * The value of the card.
     *
     * @type {number | null }
     */
    value = null;

    /**
     * @private
     *
     * True if the card is face up, false if face down.
     *
     * @type {boolean}
     */
    faceUp = false;

    /**
     * Card constructor.
     *
     * @param {number} value - Card's value.
     */
    constructor(value) {
        this.value = value;
    }

    /**
     * @public
     *
     * Flip the card to the other side.
     */
    flip() {
        this.faceUp = !this.faceUp;
    }

    get value() {
        return this.faceUp ? this.value : null;
    }

    get faceUp() {
        return this.faceUp
    }

    /**
     * Automatically called when the class is converted to a JSON object.
     * Needed to hide tha value of a card when it is face down.
     *
     * @returns {{faceUp: boolean, value: (number|null)}}
     */
    toJSON() {
        return {
            faceUp: this.faceUp,
            value: this.faceUp ? this.value : null,
        }
    }
}

module.exports = Card;
