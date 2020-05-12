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
     * Takes a card from either deck into the player's hand.
     *
     * @param {string} deck - Deck to take card from.
     */
    takeCardIntoHand(deck) {
        ApiService.get(ApiService.URLS.takeCardIntoHand(this.props.gameCode), {deck: deck});
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
                        onClick={() => this.takeCardIntoHand("draw")}
                    />
                </span>
                }
                {
                    this.props.discard.length > 0 &&
                    <span title="Discard Deck">
                        <span>Discard Deck</span>
                        <Card
                            value={this.props.discard[0].value}
                            isInteractable={this.props.clientPlayerPickCard}
                            onClick={() => this.takeCardIntoHand("discard")}
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
    cardInHand: PropTypes.object,
    stack: PropTypes.array,
    discard: PropTypes.array,
}
