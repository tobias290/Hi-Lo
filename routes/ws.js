let express = require("express");
let router = express.Router();

router.ws("/:gameCode", (ws, req) => {
    ws.on("message", (message) => {
        //req.app.get("wss").clients;
    });
});

module.exports = router;
