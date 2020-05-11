import React from "react";
import PropTypes from "prop-types";

export default class Game extends React.Component {
    render() {
        return this.props.value === null ? this.renderBackSide() : this.renderFaceSide();
    }

    getCardColor(value) {
        if (value < 0) {
            return "#00008b";
        } else if (value === 0) {
            return "#00e5e5";
        } else if (value >= 0 && value < 5) {
            return "#00FF00";
        } else if (value >= 5 && value < 9 ) {
            return "#E5E500";
        } else if (value >= 9) {
            return "#FF0000";
        }
    }

    underlineCard() {
        return this.props.value === 6 || this.props.value === 9;
    }

    renderBackSide() {
        return (
            <div className={`card card--back ${this.props.isInteractable ? "card--hover-effect" : ""}`}>
                <span>Hi-Lo</span>
                <span>Hi-Lo</span>
            </div>
        );
    }

    renderFaceSide() {
        return (
            <div className={`card card--face ${this.props.isInteractable ? "card--hover-effect" : ""}`} style={{background: this.getCardColor(this.props.value)}}>
                <span className={this.underlineCard() ? "card--underline-value" : ""}>{this.props.value}</span>
                <h1 className={this.underlineCard() ? "card--underline-value" : ""}>{this.props.value}</h1>
                <span className={this.underlineCard() ? "card--underline-value" : ""}>{this.props.value}</span>
            </div>
        );
    }
}

Game.propTypes = {
    value: PropTypes.number,
    isInteractable: PropTypes.bool,
}

Game.defaultProps = {
    isInteractable: false,
}
