import React from "react";
import HostJoin from "./HostJoin";
import "../../stylesheets/style.css";
import Game from "./Game";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHostJoinPage: true,
            playerName: "",
            gameCode: "",
        }

        this.joinGame = this.joinGame.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.hasOwnProperty("gameDetails")) {
            let gameDetails = JSON.parse(sessionStorage.getItem("gameDetails"));
            this.setState({
                showHostJoinPage: false,
                playerName: gameDetails.playerName,
                gameCode: gameDetails.gameCode,
            });
        }
    }

    /**
     * @private
     *
     * Joins a game
     *
     * @param {string} playerName - Name of the player.
     * @param {string} gameCode - Game's code.
     */
    joinGame(playerName, gameCode) {
        sessionStorage.setItem("gameDetails", JSON.stringify({
            playerName: playerName,
            gameCode: gameCode,
        }));

        this.setState({
            showHostJoinPage: false,
            playerName: playerName,
            gameCode: gameCode,
        });
    }

    render() {
        return (
            <>
                {this.state.showHostJoinPage && <HostJoin joinGame={this.joinGame} />}
                {!this.state.showHostJoinPage && <Game
                    playerName={this.state.playerName}
                    gameCode={this.state.gameCode}
                    noGameExists={() => this.setState({showHostJoinPage: true})}
                />}
            </>
        );
    }
}
