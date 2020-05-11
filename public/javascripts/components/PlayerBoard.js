import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";



export default class PlayerBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="player-board">
                {this.props.cards.map(column => column.map(card =>
                    <Card value={card.value} />
                ))}
            </div>
        );
    }
}

PlayerBoard.propTypes = {
    cards: PropTypes.array,
}
