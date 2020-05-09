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
        }

        this.canJoinGame = this.canJoinGame.bind(this);
        this.hostGame = this.hostGame.bind(this);
    }

    componentDidMount() {
        let ws = new WebSocket("ws://localhost:8000/ws");

        ws.addEventListener("open", (e) => {
            ws.send("Sending from react");
        });

        ws.addEventListener("message", (e) => {
            console.log("React got message");
            console.log("Data: " + e.data);
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

    render() {
        return (
            <>
                <h1>Hi-Lo!</h1>

                {
                    this.state.gameCode === "" &&
                    <>
                        <input required onChange={(e) => this.setState({playerNameInput: e.target.value})} />
                        <button onClick={this.hostGame} disabled={!this.canJoinGame()}>Host Game</button>
                        <button disabled={!this.canJoinGame()}>Join Game</button>
                    </>
                }

                {
                    this.state.gameCode !== "" &&
                    <>
                        <h2>Welcome {this.state.playerName}</h2>
                        The Game code is <strong>{this.state.gameCode}</strong>
                    </>
                }
            </>
        );
    }
}
