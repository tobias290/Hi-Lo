import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";



export default class PlayerBoard extends React.Component {
    constructor(props) {
        super(props);
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
                    {this.props.board.cards.flat().map(card =>
                        <Card value={card.value} />
                    )}
                </div>
            </div>
        );
    }
}

PlayerBoard.propTypes = {
    board: PropTypes.array,
    displayScore: PropTypes.bool
}

PlayerBoard.defaultProps = {
    displayScore: true,
}
