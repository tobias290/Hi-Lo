let express = require("express");
let router = express.Router();
let Player = require("../gobjects/Player");

router.get("/host", (req, res) => {
    res.json({
        game_code: req.app.get("gamesManager").createNewGame(new Player(req.query["player"], true)),
        player_name: req.query["player"],
    });
});

router.get("/join", (req, res) => {
    let game = req.app.get("gamesManager").findGame(req.query["code"]);
    let errorMessage;

    // TODO: Functionality to max player limit

    if (game !== undefined) {
        if (game.hasStarted()) {
            errorMessage = "Cannot join this game because it has already started";
        } else {
            req.app.get("gamesManager").findGame(req.query["code"]).addPlayer(new Player(req.query["player"]));

            req.app.get("event").emit("ws", "update:game");
        }
    } else {
        errorMessage = "Game does not exist, try a different game code";
    }

    res.json({
        success: game !== undefined && errorMessage === undefined,
        error: errorMessage,
        player_name: req.query["player"],
        game_code: req.query["code"],
    });
});

router.get("/:gameCode/start", (req, res) => {
    let game = req.app.get("gamesManager").findGame(req.params["gameCode"]);

    if (game !== undefined) {
        game.start();
        req.app.get("event").emit("ws", "update:game");
    }

    res.json(game !== undefined ? {started: true} : {error: "Game does not exist"});
});

router.get("/:gameCode/state", (req, res) => {
    let game = req.app.get("gamesManager").findGame(req.params["gameCode"]);

    res.json(game !== undefined ? req.app.get("gamesManager").findGame(req.params["gameCode"]) : {error: "Game does not exist"});
});

module.exports = router;
