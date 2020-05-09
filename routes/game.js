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
    }

    res.json({
        success: game !== undefined,
        player_name: req.query["player"],
        other_players: game.players,
        game_code: req.query["code"],
    });
});

module.exports = router;
