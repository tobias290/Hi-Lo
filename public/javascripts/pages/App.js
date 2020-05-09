import React from "react";
import "../../stylesheets/style.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameCode: "",
        }

        this.hostGame = this.hostGame.bind(this);
    }

    componentDidMount() {
        // let ws = new WebSocket("ws://localhost:8000");
        //
        // ws.addEventListener("open", (e) => {
        //     ws.send("Sending from react");
        // });
        //
        // ws.addEventListener("message", (e) => {
        //     console.log("React got message");
        //     console.log("Data: " + e.data);
        // });
    }

    /**
     * @private
     *
     * Sets up a game. Making the user the host.
     */
    hostGame() {
        // TODO: Create app api manager

        fetch("http://localhost:8000/api/host-game")
            .then(resp => resp.json())
            .then(resp => this.setState({gameCode: resp.game_code}))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <>
                <h1>Hi-Lo!</h1>

                {
                    this.state.gameCode === "" &&
                    <>
                        <button onClick={this.hostGame}>Host Game</button>
                        <button>Join Game</button>
                    </>
                }

                {
                    this.state.gameCode !== "" &&
                    <>
                        <h2>Game Code</h2>
                        <strong>{this.state.gameCode}</strong>
                    </>
                }
            </>
        );
    }
}
