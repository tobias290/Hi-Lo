import React from "react";
import "../../stylesheets/style.css";
import ApiService from "../apiService";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameCode: "",
            playerName: "",
            playerNameInput: "",
            showGameCodeInput: false,
            gameCodeInput: "",
            hasJoinedGame: false,
            otherPlayers: [],
        }

        this.canJoinGame = this.canJoinGame.bind(this);
        this.hostGame = this.hostGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.gameCode === null)
            return;

        let ws = new WebSocket(`ws://localhost:8000/ws/${this.state.gameCode}`);

        ws.addEventListener("open", (e) => {
            console.log("Connected Websocket for " + this.state.playerName);
        });

        ws.addEventListener("message", (e) => {
            // TODO: Do something with data
            console.log("Incoming Message: ", e.data);
        });
    }

    /**
     * @private
     *
     * Checks whether the player's name is valid.
     *
     * @returns {boolean} - Returns true if the user is allowed to host/join a game.
     */
    canJoinGame() {
        // Update to only support names create than 3 characters that are not spaces
        return this.state.playerNameInput !== "";
    }

    /**
     * @private
     *
     * Sets up a game. Making the user the host.
     */
    hostGame() {
        ApiService
            .get(ApiService.URLS.hostGame, {player: this.state.playerNameInput})
            .then(resp => this.setState({gameCode: resp.game_code, playerName: resp.player_name}));
    }

    /**
     * @private
     *
     * Joins an existing game.
     */
    joinGame() {
        ApiService
            .get(ApiService.URLS.joinGame, {player: this.state.playerNameInput, code: this.state.gameCodeInput})
            .then(resp => {
                if (resp.success) {
                    // Success
                    this.setState({
                        hasJoinedGame: true,
                        showGameCodeInput: false,
                        gameCode: resp.game_code,
                        playerName: resp.player_name,
                        otherPlayers: resp.other_players,
                    });
                } else {
                    // Failure
                    console.log("Failed to connect to game");
                }
            })
    }

    render() {
        return (
            <>
                <h1>Hi-Lo!</h1>

                {
                    this.state.gameCode === "" && !this.state.showGameCodeInput &&
                    <>
                        <input type="text" required onChange={(e) => this.setState({playerNameInput: e.target.value})} />
                        <button onClick={this.hostGame} disabled={!this.canJoinGame()}>Host Game</button>
                        <button disabled={!this.canJoinGame()} onClick={() => this.setState({showGameCodeInput: true})}>Join Game</button>
                    </>
                }

                {
                    this.state.showGameCodeInput &&
                    <>
                        <input type="text" min="4" max="4" required onChange={(e) => this.setState({gameCodeInput: e.target.value})} />
                        <button disabled={!this.canJoinGame()} onClick={this.joinGame}>Join</button>
                    </>
                }

                {
                    this.state.gameCode !== "" &&
                    <>
                        <h2>Welcome {this.state.playerName}</h2>
                        The Game code is <strong>{this.state.gameCode}</strong>

                        {
                            this.state.hasJoinedGame &&
                            <ul>
                                <li>Players:</li>
                                {this.state.otherPlayers.map(player => <li>{player.name}</li>)}
                            </ul>
                        }
                    </>
                }
            </>
        );
    }
}
