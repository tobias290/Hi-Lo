import React from "react";
import PropTypes from "prop-types";
import ApiService from "../apiService";
import GamePhase from "../../../gobjects/GamePhase";
import PlayerTurnPhase from "../../../gobjects/PlayerTurnPhase";
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
        this.isClientPlayersTurn = this.isClientPlayersTurn.bind(this);
        this.startNextRound = this.startNextRound.bind(this);
        this.endGame = this.endGame.bind(this);
    }

    componentDidMount() {
        this.updateGameState();

        this.ws = new WebSocket(`ws://192.168.1.123:8000/ws/${this.props.gameCode}`);

        this.ws.addEventListener("message",  (event) => {
            let data = JSON.parse(event.data);

            if (data.event === `update:game:${this.props.gameCode}` && data.game !== undefined)
                this.setState({game: data.game});
            else if (data.event === `update:game:${this.props.gameCode}` && data.game === undefined)
                window.location.reload(true);
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
     * @private
     *
     * Starts the next game round.
     */
    startNextRound() {
        ApiService.get(ApiService.URLS.startNextRound(this.props.gameCode));
    }

    /**
     * @private
     *
     * Ends the game
     */
    endGame() {
        ApiService.get(ApiService.URLS.endGame(this.props.gameCode));
    }

    /**
     * @private
     *
     * Gets the correct message to display.
     *
     * @returns {string|null}
     */
    getGameMessage() {
        if (this.state.game.currentPhase === GamePhase.PLAYERS_PICKING_STARTING_CARDS && this.isClientPlayersTurn()) {
            return "Pick two starting cards"
        } else if (this.state.game.currentPhase === GamePhase.PLAYERS_PICKING_STARTING_CARDS && !this.isClientPlayersTurn()) {
            return "Other players are picking their two starting cards"
        } else if(this.state.game.currentPhase === GamePhase.PLAYERS_JOINING) {
            return <span>GAME CODE: <strong>{this.props.gameCode}</strong></span>
        } else if (this.state.game.currentPhase === GamePhase.PLAYER_TURN && this.isClientPlayersTurn()) {
            if (this.getClientPlayer().turnPhase === PlayerTurnPhase.PICKING_CARD) {
                return "Pick a card from either the deck or discard";
            } else if (this.getClientPlayer().turnPhase === PlayerTurnPhase.PLACING_CARD) {
                return "Place the card on your board or on the discard";
            } else if (this.getClientPlayer().turnPhase === PlayerTurnPhase.REVEAL_CARD) {
                return "Flip a card face up";
            } else {
                return "It is your turn";
            }
        } else if (this.state.game.currentPhase === GamePhase.PLAYER_TURN && !this.isClientPlayersTurn()) {
            return `It is ${this.state.game.players[this.state.game.currentPlayerTurnIndex].name}'s turn`;
        } else if (this.state.game.currentPhase === GamePhase.ROUND_END) {
            return "Round is over";
        }
    }

    /**
     * @private
     *
     * Gets the details for the clients player.
     *
     * @returns {*} - Returns the player.
     */
    getClientPlayer() {
        return this.state.game.players.find(player => player.name === this.props.playerName);
    }

    /**
     * @private
     *
     * Gets the details for the left of clients player.
     *
     * @returns {*} - Returns the player.
     */
    getClientsLeftPlayer() {
        let clientPlayerIndex = this.state.game.players.indexOf(this.getClientPlayer());

        return this.state.game.players[clientPlayerIndex >= this.state.game.players.length - 1 ? 0 : clientPlayerIndex + 1];
    }

    /**
     * @private
     *
     * @returns {boolean} - Returns true if it is the clients turn.
     */
    isClientPlayersTurn() {
        return this.state.game.players.indexOf(this.getClientPlayer()) === this.state.game.currentPlayerTurnIndex;
    }

    render() {
        return this.state.game === null ? <h1>Loading...</h1> : (
            <>
                <div className="game-top-bar">
                    <h1 className="game-top-bar__title">Hi-Lo</h1>
                    <div className="game-top-bar__message">
                        {this.getGameMessage()}
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
                        <div className="play-area__right">
                            <CardStacks
                                gameCode={this.props.gameCode}
                                clientPlayerPickCard={
                                    this.state.game.currentPhase === GamePhase.PLAYER_TURN &&
                                    this.getClientPlayer().turnPhase === PlayerTurnPhase.PICKING_CARD &&
                                    this.isClientPlayersTurn()
                                }
                                clientPlayerDiscardCard={
                                    this.state.game.currentPhase === GamePhase.PLAYER_TURN &&
                                    this.getClientPlayer().turnPhase === PlayerTurnPhase.PLACING_CARD &&
                                    this.isClientPlayersTurn()
                                }
                                cardInHand={this.getClientPlayer().cardInHand}
                                stack={this.state.game.stack.stack}
                                discard={this.state.game.discard.stack}
                            />
                            <PlayerBoard
                                game={this.state.game}
                                isClientsPlayersTurn={this.isClientPlayersTurn()}
                                board={this.getClientPlayer().board}
                                overallScore={this.getClientPlayer().overallScore}
                                displayMessage={true}
                            />
                        </div>
                        <div className="play-area__other-players-board">
                            {this.state.game.players.filter(player => player.name !== this.getClientPlayer().name).map(player =>
                                <PlayerBoard
                                    game={this.state.game}
                                    board={player.board}
                                    displayMessage={true}
                                    customDisplayMessage={<strong>{player.name}</strong>}
                                    centerMessage={true}
                                    small={true}
                                />
                            )}
                        </div>
                    </div>
                }

                {
                    (this.state.game.currentPhase === GamePhase.ROUND_END || this.state.game.currentPhase === GamePhase.GAME_END) &&
                    <div className="round-end-area">
                        <h1 className="round-end__message">
                            {this.state.game.currentPhase === GamePhase.ROUND_END && "Round End"}
                            {
                                this.state.game.currentPhase === GamePhase.GAME_END &&
                                <>
                                    Game End,&nbsp;
                                    {this.state.game.players.sort((a, b) => a.overallScore - b.overallScore)[0].name} wins!
                                </>
                            }
                        </h1>
                        <table className="scores-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Score this round</th>
                                    <th>Overall Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.game.players.map(player =>
                                    <tr>
                                        <td>{player.name}</td>
                                        <td>{player.board.visibleScore}</td>
                                        <td>{player.overallScore}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {
                            this.state.game.currentPhase === GamePhase.ROUND_END &&
                            <>
                                {this.state.playerIsHost && <button className="button button--x-large" onClick={this.startNextRound}>Start Next Round</button>}
                                {!this.state.playerIsHost && <h1>Waiting for host to start next round...</h1>}
                            </>
                        }
                        {
                            this.state.game.currentPhase === GamePhase.GAME_END &&
                            <>
                                {this.state.playerIsHost && <button className="button button--x-large" onClick={this.endGame}>End Game</button>}
                                {!this.state.playerIsHost && <h1>Waiting for host to end game...</h1>}
                            </>
                        }
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
