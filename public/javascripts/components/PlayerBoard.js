import React from "react";
import PropTypes from "prop-types";
import GamePhase from "../../../gobjects/GamePhase";
import PlayerTurnPhase from "../../../gobjects/PlayerTurnPhase";

import Card from "./Card";
import ApiService from "../apiService";


export default class PlayerBoard extends React.Component {
    constructor(props) {
        super(props);

        this.renderCards = this.renderCards.bind(this);
        this.cardsInteractable = this.cardsInteractable.bind(this);
        this.getCardAction = this.getCardAction.bind(this);
        this.pickStartingCard = this.pickStartingCard.bind(this);
        this.placeCard = this.placeCard.bind(this);
        this.flipCard = this.flipCard.bind(this);
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
     * Checks to see if a card is interactable.
     *
     * @param {number} cardColumn - Card's column.
     * @param {number} cardRow - Card's row.
     *
     * @returns {boolean} - Returns true if a card is interactable.
     */
    cardsInteractable(cardColumn, cardRow) {
        return (
            (this.props.isClientsPlayersTurn && this.props.game.currentPhase === GamePhase.PLAYERS_PICKING_STARTING_CARDS) ||
            (this.props.isClientsPlayersTurn && this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase === PlayerTurnPhase.PLACING_CARD) ||
            (this.props.isClientsPlayersTurn && this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase === PlayerTurnPhase.REVEAL_CARD && !this.props.board.cards[cardColumn][cardRow].faceUp)
        );
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
        if (this.props.isClientsPlayersTurn && this.props.game.currentPhase === GamePhase.PLAYERS_PICKING_STARTING_CARDS) {
            this.pickStartingCard(cardColumn, cardRow);
        } else if (this.props.isClientsPlayersTurn && this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase === PlayerTurnPhase.PLACING_CARD) {
            this.placeCard(cardColumn, cardRow);
        } else if (this.props.isClientsPlayersTurn && this.props.game.players[this.props.game.currentPlayerTurnIndex].turnPhase === PlayerTurnPhase.REVEAL_CARD && !this.props.board.cards[cardColumn][cardRow].faceUp) {
            this.flipCard(cardColumn, cardRow);
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

    /**
     * @private
     *
     * Places a card from the player's hand onto their board.
     *
     * @param {number} cardColumn - Card's column.
     * @param {number} cardRow - Card's row.
     */
    placeCard(cardColumn, cardRow) {
        ApiService.get(
            ApiService.URLS.placeCardOnBoard(this.props.game.gameCode),
            {location: "board", column: cardColumn, row: cardRow}
        );
    }

    /**
     * @private
     *
     * Places a card from the player's hand onto their board.
     *
     * @param {number} cardColumn - Card's column.
     * @param {number} cardRow - Card's row.
     */
    flipCard(cardColumn, cardRow) {
        ApiService.get(
            ApiService.URLS.revealCardOnBoard(this.props.game.gameCode), {column: cardColumn, row: cardRow});
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
                            isInteractable={this.cardsInteractable(cardColumn, cardRow)}
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
    isClientsPlayersTurn: PropTypes.bool,
    clientPlayerTurnPhase: PropTypes.number,
    board: PropTypes.object,
    displayScore: PropTypes.bool,
}

PlayerBoard.defaultProps = {
    isClientsPlayersTurn: false,
    displayScore: true,
}
