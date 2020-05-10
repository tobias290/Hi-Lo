import React from "react";
import PropTypes from "prop-types";
import ApiService from "../apiService";

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
            checkedForPlayerHost: false,
            playerIsHost: false,
        }

        this.updateGameState = this.updateGameState.bind(this);
    }

    componentDidMount() {
        this.updateGameState();

        this.ws = new WebSocket(`ws://192.168.1.123:8000/ws/${this.props.gameCode}`);

        this.ws.addEventListener("message",  (event) => {
            let data = JSON.parse(event.data);

            if (data.event === "update:game" && data.game !== undefined) {
                console.log("Updating game state");
                this.setState({game: data.game});
            }
        });
    }

    componentWillUnmount() {
        if (this.ws !== undefined)
            this.ws.close();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.game !== null && !this.state.checkedForPlayerHost)
            for (let player of this.state.game.players)
                if (player.name === this.props.playerName && player.isHost)
                    this.setState({playerIsHost: true, checkedForPlayerHost: true});
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
                <div>Name: {this.props.playerName} {this.state.playerIsHost ? "Hosting" : ""}</div>
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
