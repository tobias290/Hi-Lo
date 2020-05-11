import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";



export default class CardStacks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card-stacks">
                <span title="Draw Deck"><Card value={this.props.stack[0].value} /></span>
                <span title="Discard Deck"><Card value={this.props.discard[0].value} /></span>
            </div>
        );
    }
}

CardStacks.propTypes = {
    stack: PropTypes.array,
    discard: PropTypes.array,
}
