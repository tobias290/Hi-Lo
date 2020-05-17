import React from "react";
import PropTypes from "prop-types";

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.card = React.createRef();
    }

    componentDidMount() {
        let onResize = () => {
            let windowHeight = window.innerHeight;
            let windowWidth = window.innerWidth
            let windowSize = windowHeight < windowWidth ? windowHeight : windowWidth;

            this.card.current.style.height = `${windowSize * 0.175}px`;
            this.card.current.style.width = `${windowSize * 0.1}px`;
            this.card.current.style.fontSize = `${windowSize * 0.001}rem`;
        };

        window.addEventListener("resize", onResize);
        onResize();
    }

    /**
     * @private
     *
     * Gets the correct color for the given card.
     *
     * @param {number} value - Value of the card.
     * @returns {string} - Returns the hex code for the card.
     */
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

    /**
     * @private
     *
     * Underlines the six and nine card to make them clearer.
     *
     * @returns {boolean} - Returns true if the card should be underlines.
     */
    underlineCard() {
        return this.props.value === 6 || this.props.value === 9;
    }

    render() {
        return this.props.isPlaceholder ? this.renderPlaceholder() : this.props.value === null ? this.renderBackSide() : this.renderFaceSide();
    }

    renderPlaceholder() {
        return (
            <div ref={this.card} className={`card card--placeholder ${this.props.isInteractable ? "card--hover-effect" : ""}`} onClick={this.props.isInteractable ? this.props.onClick : () => {}}>
                {this.props.value}
            </div>
        )
    }

    renderBackSide() {
        return (
            <div ref={this.card} className={`card card--back ${this.props.isInteractable ? "card--hover-effect" : ""}`} onClick={this.props.isInteractable ? this.props.onClick : () => {}}>
                <span>Hi-Lo</span>
                <span>Hi-Lo</span>
            </div>
        );
    }

    renderFaceSide() {
        return (
            <div ref={this.card} className={`card card--face ${this.props.isInteractable ? "card--hover-effect" : ""}`} onClick={this.props.isInteractable ? this.props.onClick : () => {}} style={{background: this.getCardColor(this.props.value)}}>
                <span className={this.underlineCard() ? "card--underline-value" : ""}>{this.props.value}</span>
                <h1 className={this.underlineCard() ? "card--underline-value" : ""}>{this.props.value}</h1>
                <span className={this.underlineCard() ? "card--underline-value" : ""}>{this.props.value}</span>
            </div>
        );
    }
}

Card.propTypes = {
    isPlaceholder: PropTypes.bool,
    value: PropTypes.number,
    isInteractable: PropTypes.bool,
    onClick: PropTypes.func,
}

Card.defaultProps = {
    isPlaceholder: false,
    isInteractable: false,
    onClick: () => {},
}
