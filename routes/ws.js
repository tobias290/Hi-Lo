let express = require("express");
let router = express.Router();

router.ws("/:gameCode", (ws, req) => {
    if (req.app.get("event").listenerCount("ws") <= 1)
        req.app.get("event").on("ws", (event) => ws.emit(event)); // Converts any event emitted into a websocket event

    ws.on("open", () => {
        req.app.get("event").on("ws", (event) => ws.emit(event));
    })

    ws.on("update:game", () => {
        req.app.get("wss").clients.forEach(function each(client) {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    event: "update:game",
                    game: req.app.get("gamesManager").findGame(req.params["gameCode"]),
                }));
            }
        });
    });

    ws.on("close", () => {
        req.app.get("event").removeAllListeners("ws");
    })
});

module.exports = router;
