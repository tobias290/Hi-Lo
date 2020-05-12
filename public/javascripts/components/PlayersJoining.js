import React from "react";
import PropTypes from "prop-types";
import ApiService from "../apiService";



export default class PlayersJoining extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
        };

        this.players = this.players.bind(this);
        this.playersTop = this.playersTop.bind(this);
        this.playersBottom = this.playersBottom.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    /**
     * Starts the game.
     */
    startGame() {
        ApiService
            .get(ApiService.URLS.startGame(this.props.gameCode))
            .then(resp => {
                if (!resp.success)
                    this.setState({errorMessage: resp.error});
            })
    }

    /**
     * @private
     *
     * @returns {*[]} - Returns list of players.
     */
    players() {
        return this.props.players.filter(player => player.name !== this.props.playerName);
    }

    /**
     * @private
     *
     * @returns {*[]} - Returns list of players to display in the top half of the screen.
     */
    playersTop() {
        let players = this.players();

        return players.length > 4 ? players.slice(0, 4) : players;
    }

    /**
     * @private
     *
     * @returns {*[]} - Returns list of players to display in the bottom half of the screen.
     */
    playersBottom() {
        let players = this.players();

        return players.length > 4 ? players.slice(4, players.length) : [];
    }

    render() {
        return (
            <div className="players-joining">
                <div className="players">
                    {this.playersTop().map(player =>
                        <span key={player.name}>{player.name}</span>
                    )}
                    {this.playersTop().length === 0 ? <h2>No other players</h2> : null}
                </div>
                {this.props.playerIsHost ? <button className="button button--x-large" onClick={this.startGame}>Start Game</button> : <h1>Waiting for host to start the game...</h1>}
                <div className="players">
                    {this.playersBottom().map(player =>
                        <span key={player.name}>{player.name}</span>
                    )}
                </div>
                {this.state.errorMessage !== "" && <h1 className="error">{this.state.errorMessage}</h1>}
            </div>
        );
    }
}

PlayersJoining.propTypes = {
    gameCode: PropTypes.string,
    playerName: PropTypes.string,
    playerIsHost: PropTypes.bool,
    players: PropTypes.array,
}
