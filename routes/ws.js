let express = require("express");
let router = express.Router();

router.ws("/:gameCode", (ws, req) => {
    req.app.get("event").on("ws", (event) => ws.emit(event));

    ws.on("joinedGame", () => {
        req.app.get("wss").clients.forEach(function each(client) {
            if (client.readyState === 1) {
                client.send("Someone joined the game");
            }
        });
    });
});

module.exports = router;
