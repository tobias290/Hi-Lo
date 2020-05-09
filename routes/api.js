let express = require("express");
let router = express.Router();

let Player = require("../gobjects/Player");

router.get("/host-game", (req, res) => {
    res.json({
        game_code: req.app.get("gamesManager").createNewGame(new Player(req.query["player"])),
        player_name: req.query["player"],
    });
});

router.get("/join-game", (req, res) => {
    res.json({
        player: req.query["player"],
    });
});

module.exports = router;
