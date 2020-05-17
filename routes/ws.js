let express = require("express");
let router = express.Router();

router.ws("/:gameCode", (ws, req) => {
    if (req.app.get("event").listenerCount("ws") <= 1)
        req.app.get("event").on("ws", (event, gameCode) => ws.emit(event, gameCode)); // Converts any event emitted into a websocket event

    ws.on("open", () => {
        req.app.get("event").on("ws", (event) => ws.emit(event));
    });

    ws.on("update:game", (gameCode) => {
        req.app.get("wss").clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    event: `update:game:${gameCode}`,
                    game: req.app.get("gamesManager").findGame(gameCode),
                }));
            }
        });
    });

    ws.on("close", () => {
        req.app.get("event").removeAllListeners("ws");
    });
});

module.exports = router;
