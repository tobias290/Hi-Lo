import React from "react";
import PropTypes from "prop-types";
import ApiService from "../apiService";

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
        }

        this.updateGameState = this.updateGameState.bind(this);
    }

    componentDidMount() {
        this.updateGameState();

        const socket = new WebSocket(`ws://localhost:8000/ws/${this.props.gameCode}`);

        socket.addEventListener("message",  (event) => {
            let data = JSON.parse(event.data);

            if (data.event === "update:game")
                this.setState({game: data.game});
        });
    }

    /**
     * @private
     *
     * Updates the game.
     */
    updateGameState() {
        ApiService
            .get(ApiService.URLS.gameState(this.props.gameCode))
            .then(resp => {
                if (resp.hasOwnProperty("error"))
                    this.props.noGameExists();
                else
                    this.setState({game: resp});
            });
    }

    render() {
        return this.state.game === null ? <h1>Loading...</h1> : (
            <>
                <h1>Game</h1>
                <div>Name: {this.props.playerName}</div>
                <div>Game Code: {this.props.gameCode}</div>
                <div>
                    <div>Other Players:</div>
                    <ul>
                        {this.state.game.players.map(player =>
                            <li>{player.name}</li>
                        )}
                    </ul>
                </div>
            </>
        );
    }
}

Game.propTypes = {
    playerName: PropTypes.string,
    gameCode: PropTypes.string,
    noGameExists: PropTypes.func,
}
