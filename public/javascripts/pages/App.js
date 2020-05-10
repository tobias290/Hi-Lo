import React from "react";
import HostJoin from "./HostJoin";
import "../../stylesheets/style.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHostJoinPage: true,
        }

        this.joinGame = this.joinGame.bind(this);
    }

    joinGame(playerName, gameCode) {

    }

    render() {
        return (
            <>
                {this.state.showHostJoinPage && <HostJoin joinGame={this.joinGame} />}
            </>
        );
    }
}
