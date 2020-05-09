import React from "react";
import ApiService from "../apiService";

export default class HostJoin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.canJoinGame = this.canJoinGame.bind(this);
        this.hostGame = this.hostGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    /**
     * @private
     *
     * Checks whether the player's name is valid.
     *
     * @returns {boolean} - Returns true if the user is allowed to host/join a game.
     */
    canJoinGame() {
        // TODO: Support names greater than 3 characters that are not spaces
        return true;
    }

    /**
     * @private
     *
     * Sets up a game. Making the user the host.
     */
    hostGame() {
        ApiService
            .get(ApiService.URLS.hostGame, {player: null}) // TODO: Fill in
            .then(resp => this.setState({gameCode: resp.game_code, playerName: resp.player_name}));
    }

    /**
     * @private
     *
     * Joins an existing game.
     */
    joinGame() {
        ApiService
            .get(ApiService.URLS.joinGame, {player: null, code: null}) // TODO: Fill  in
            .then(resp => {
                if (resp.success) {
                    // Success
                    this.setState({

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
                <h1 className="title">Hi-LO</h1>

                <div className="options">
                    <button className="button button--x-large">Host Game</button>
                    <button className="button button--x-large">Join Game</button>
                </div>
            </>
        );
    }
}
