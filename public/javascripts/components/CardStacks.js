import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import ApiService from "../apiService";



export default class CardStacks extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @private
     *
     * Gets the correct action to perform.
     *
     * @param {string} deck - The deck this action is called from.
     */
    getCardAction(deck) {
        if (this.props.clientPlayerPickCard)
            this.takeCardIntoHand(deck);
        else if (this.props.clientPlayerDiscardCard && deck === "discard")
            this.discardCardFromHand();
    }

    /**
     * @private
     *
     * Takes a card from either deck into the player's hand.
     *
     * @param {string} deck - Deck to take card from.
     */
    takeCardIntoHand(deck) {
        ApiService.get(ApiService.URLS.takeCardIntoHand(this.props.gameCode), {deck: deck});
    }

    /**
     * @private
     *
     * Discard the player's card to the discard pile
     */
    discardCardFromHand() {
        ApiService
            .get(ApiService.URLS.placeCardOnBoard(this.props.gameCode), {deck: "discard"});
    }

    render() {
        return (
            <div className="card-stacks">
                {
                    (this.props.cardInHand !== undefined && this.props.cardInHand !== null) &&
                    <span title="Draw Deck">
                        <span>Card in Hand</span>
                        <Card value={this.props.cardInHand.value} />
                    </span>
                }
                {
                    this.props.stack.length > 0 &&
                    <span title="Draw Deck">
                    <span>Draw Deck</span>
                    <Card
                        value={this.props.stack[0].value}
                        isInteractable={this.props.clientPlayerPickCard}
                        onClick={() => this.getCardAction("draw")}
                    />
                </span>
                }
                {
                    this.props.discard.length > 0 &&
                    <span title="Discard Deck">
                        <span>Discard Deck</span>
                        <Card
                            value={this.props.discard[0].value}
                            isInteractable={this.props.clientPlayerPickCard || this.props.clientPlayerDiscardCard}
                            onClick={() => this.getCardAction("discard")}
                        />
                    </span>
                }
            </div>
        );
    }
}

CardStacks.propTypes = {
    gameCode: PropTypes.string,
    clientPlayerPickCard: PropTypes.bool,
    clientPlayerDiscardCard: PropTypes.bool,
    cardInHand: PropTypes.object,
    stack: PropTypes.array,
    discard: PropTypes.array,
}
