import React from "react";
import PropTypes from "prop-types";
import GamePhase from "../../../gobjects/GamePhase";

import Card from "./Card";
import ApiService from "../apiService";


export default class PlayerBoard extends React.Component {
    constructor(props) {
        super(props);

        this.renderCards = this.renderCards.bind(this);
        this.getCardAction = this.getCardAction.bind(this);
        this.pickStartingCard = this.pickStartingCard.bind(this);
    }

    /**
     * @private
     *
     * Renders the cards in the correct order.
     *
     * @param {function} renderer - Function that renders the card.
     * @returns {[]} - Returns the list of cards.
     */
    renderCards(renderer) {
        let cards = [];

        for (let i = 0; i < 3; i++)
            for (let j in this.props.board.cards)
                cards.push(renderer(this.props.board.cards[j][i], j, i));

        return cards;
    }

    /**
     * @private
     *
     * Gets the correct action for the card.
     *
     * @param {number} cardColumn - Card's column.
     * @param {number} cardRow - Card's row.
     */
    getCardAction(cardColumn, cardRow) {
        if (this.props.game.currentPhase === GamePhase.PLAYERS_PICKING_STARTING_CARDS && this.props.cardsInteractable) {
            this.pickStartingCard(cardColumn, cardRow);
        }
    }

    /**
     * @private
     *
     * Picks a player's starting card.
     *
     * @param {number} cardColumn - Card's column.
     * @param {number} cardRow - Card's row.
     */
    pickStartingCard(cardColumn, cardRow) {
        ApiService
            .get(ApiService.URLS.pickStartingCard(this.props.game.gameCode), {column: cardColumn, row: cardRow});
    }

    render() {
        return (
            // NOTE/FIXME: Pretty sure it's looping over the cards the wrong way
            <div>
                {
                    this.props.displayScore &&
                    <div className="player-board-info">
                        <span><strong>Visible Score:</strong> {this.props.board.visibleScore}</span>
                        <span><strong>Number of Face Up Cards:</strong> {this.props.board.noOfFaceUpCards}</span>
                    </div>
                }
                <div className="player-board">
                    {this.renderCards((card, cardColumn, cardRow) =>
                        <Card
                            key={`${cardColumn}-${cardRow}`}
                            value={card.value}
                            isInteractable={this.props.cardsInteractable}
                            onClick={() => this.getCardAction(cardColumn, cardRow)}
                        />
                    )}
                </div>
            </div>
        );
    }
}

PlayerBoard.propTypes = {
    game: PropTypes.object,
    board: PropTypes.object,
    displayScore: PropTypes.bool,
    cardsInteractable: PropTypes.bool,
}

PlayerBoard.defaultProps = {
    displayScore: true,
    cardsInteractable: false,
}
