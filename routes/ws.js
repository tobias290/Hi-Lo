let express = require("express");
let router = express.Router();
let expressWs = require("express-ws")(router);

router.ws("/", (ws, req) => {
    ws.on("message", (message) => {
        console.log("Server got message!");
        ws.send(`Received Message: ${message}`);
    })

    console.log("Logging from '/' ws");
});

module.exports = router;
