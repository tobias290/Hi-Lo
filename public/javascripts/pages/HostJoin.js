import React from "react";
import PropTypes from "prop-types";
import ApiService from "../apiService";

export default class HostJoin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHostGameForm: false,
            showJoinGameForm: false,
            failedToJoinGame: false,
        }

        this.hostPlayerNameInput = React.createRef();
        this.joinPlayerNameInput = React.createRef();
        this.joinGameCode = React.createRef();

        this.hostGame = this.hostGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    /**
     * @private
     *
     * Sets up a game. Making the user the host.
     */
    hostGame(event) {
        event.preventDefault();

        ApiService
            .get(ApiService.URLS.hostGame, {player: this.hostPlayerNameInput.current.value}) // TODO: Fill in
            .then(resp => this.props.joinGame(resp.player_name, resp.game_code));
    }

    /**
     * @private
     *
     * Joins an existing game.
     */
    joinGame(event) {
        event.preventDefault();
        this.setState({failedToJoinGame: false}); // Reset errors

        ApiService
            .get(ApiService.URLS.joinGame, {player: this.joinPlayerNameInput.current.value, code: this.joinGameCode.current.value.toUpperCase()}) // TODO: Fill  in
            .then(resp => {
                if (resp.success)
                    this.props.joinGame(resp.player_name, resp.game_code);
                else
                    this.setState({failedToJoinGame: true});
            })
    }

    render() {
        return (
            <>
                <h1 className="title">Hi-LO</h1>

                {
                    !this.state.showHostGameForm && !this.state.showJoinGameForm &&
                    <div className="options">
                        <button className="button button--x-large" onClick={() => this.setState({showHostGameForm: true})}>Host Game</button>
                        <button className="button button--x-large" onClick={() => this.setState({showJoinGameForm: true})}>Join Game</button>
                    </div>
                }

                {
                    this.state.showHostGameForm &&
                    <form className="options form" onSubmit={this.hostGame}>
                        <input
                            className="form__input form__input--x-large"
                            name="player"
                            type="text"
                            placeholder="Player Name"
                            required
                            minLength="3"
                            ref={this.hostPlayerNameInput}
                        />
                        <div>
                            <input
                                className="button button--x-large"
                                type="button"
                                value="Back"
                                onClick={() => this.setState({showHostGameForm: false, showJoinGameForm: false})}
                            />
                            &nbsp;&nbsp;
                            <input
                                className="button button--x-large"
                                type="submit"
                                value="Host"
                            />
                        </div>
                    </form>
                }

                {
                    this.state.showJoinGameForm &&
                    <form className="options form" onSubmit={this.joinGame}>
                        {this.state.failedToJoinGame && <h2 className="error" style={{margin: 0}}>Game does not exist, try a different game code</h2>}
                        <input
                            className="form__input form__input--x-large"
                            name="player"
                            type="text"
                            placeholder="Player Name"
                            required
                            minLength="3"
                            ref={this.joinPlayerNameInput}
                        />
                        <input
                            className="form__input form__input--x-large form__input--text-center"
                            name="code"
                            type="text"
                            placeholder="Game Code"
                            pattern="[A-Za-z][A-ZA-Za-z][A-ZA-Za-z][A-ZA-Za-z]"
                            required
                            minLength="4"
                            maxLength="4"
                            style={{textTransform: "uppercase"}}
                            ref={this.joinGameCode}
                        />
                        <div>
                            <input
                                className="button button--x-large"
                                type="button"
                                value="Back"
                                onClick={() => this.setState({showHostGameForm: false, showJoinGameForm: false})}
                            />
                            &nbsp;&nbsp;
                            <input
                                className="button button--x-large"
                                type="submit"
                                value="Join"
                            />
                        </div>
                    </form>
                }
            </>
        );
    }
}

HostJoin.propTypes = {
    joinGame: PropTypes.func,
}
