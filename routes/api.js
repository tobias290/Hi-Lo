let express = require("express");
let router = express.Router();

router.get("/host-game", (req, res) => {
    res.json({
        game_code: req.app.get("gamesManager").createNewGame()
    })
});

module.exports = router;
