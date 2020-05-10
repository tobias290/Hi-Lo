let express = require("express");
let router = express.Router();
let Player = require("../gobjects/Player");

router.get("/host", (req, res) => {
    res.json({
        game_code: req.app.get("gamesManager").createNewGame(new Player(req.query["player"])),
        player_name: req.query["player"],
    });
});

router.get("/join", (req, res) => {
    let game = req.app.get("gamesManager").findGame(req.query["code"]);

    if (game !== undefined) {
        req.app.get("gamesManager").findGame(req.query["code"]).addPlayer(new Player(req.query["player"]));

        req.app.get("event").emit("ws", "joinedGame");
    }

    res.json({
        success: game !== undefined,
        player_name: req.query["player"],
        game_code: req.query["code"],
    });
});

router.get("/:gameCode/start", (req, res) => {
    let game = req.app.get("gamesManager").findGame(req.params["gameCode"]);

    if (game !== undefined)
        game.start();

    res.json(game !== undefined ? {started: true} : {error: "Game does not exist"});
});

router.get("/:gameCode/state", (req, res) => {
    let game = req.app.get("gamesManager").findGame(req.params["gameCode"]);

    res.json(game !== undefined ? req.app.get("gamesManager").findGame(req.params["gameCode"]) : {error: "Game does not exist"});
});

module.exports = router;
