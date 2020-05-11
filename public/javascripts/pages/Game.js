import React from "react";
import PropTypes from "prop-types";
import ApiService from "../apiService";
import GamePhase from "../../../gobjects/GamePhase";
import PlayersJoining from "../components/PlayersJoining";
import PlayerBoard from "../components/PlayerBoard";
import CardStacks from "../components/CardStacks";

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: null,
            checkedForPlayerHost: false,
            playerIsHost: false,
        }

        this.updateGameState = this.updateGameState.bind(this);
        this.getClientPlayer = this.getClientPlayer.bind(this);
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

    /**
     * Gets the details for the clients player.
     *
     * @returns {*} - Returns the player.
     */
    getClientPlayer() {
        return this.state.game.players.find(player => player.name === this.props.playerName);
    }

    /**
     * Gets the details for the left of clients player.
     *
     * @returns {*} - Returns the player.
     */
    getClientsLeftPlayer() {
        let clientPlayerIndex = this.state.game.players.indexOf(this.getClientPlayer());

        return this.state.game.players[this.state.game.players.length <= clientPlayerIndex - 1 ? clientPlayerIndex : 0];
    }

    render() {
        return this.state.game === null ? <h1>Loading...</h1> : (
            <>
                <div className="game-top-bar">
                    <h1 className="game-top-bar__title">Hi-Lo</h1>
                    <div className="game-top-bar__message">
                        {this.state.game.currentPhase === GamePhase.PLAYERS_PICKING_STARTING_CARDS && "Pick two starting cards"}
                    </div>
                    <div className="game-top-bar__details">
                       <span className="game-top-bar__detail"><strong>Player Name:</strong> <span>{this.props.playerName}</span></span>
                       <span className="game-top-bar__detail"><strong>Game Code:</strong> {this.props.gameCode}</span>
                       <span className="game-top-bar__detail"><strong>No. of Players:</strong> {this.state.game.players.length}/8</span>
                    </div>
                </div>

                {
                    this.state.game.currentPhase === GamePhase.PLAYERS_JOINING &&
                    <PlayersJoining
                        gameCode={this.props.gameCode}
                        playerName={this.props.playerName}
                        playerIsHost={this.state.playerIsHost}
                        players={this.state.game.players}
                    />
                }

                {
                    (this.state.game.currentPhase === GamePhase.PLAYERS_PICKING_STARTING_CARDS || this.state.game.currentPhase === GamePhase.PLAYER_TURN) &&
                    <div className="play-area">
                        <PlayerBoard cards={this.getClientPlayer().board.cards} />
                        <div className="play-area__right">
                            <CardStacks stack={this.state.game.stack.stack} discard={this.state.game.discard.stack} />
                            <div style={{transform: "scale(0.5)", height: "500px", width: "462px"}}>
                                <h1 className="header-no-margin">Player to your left cards</h1>
                                <br />
                                <PlayerBoard cards={this.getClientsLeftPlayer().board.cards} />
                            </div>
                        </div>
                        <div>
                        {/* TODO: Add player scores here */}
                        </div>
                    </div>
                }
            </>
        );
    }
}

Game.propTypes = {
    playerName: PropTypes.string,
    gameCode: PropTypes.string,
    noGameExists: PropTypes.func,
}
