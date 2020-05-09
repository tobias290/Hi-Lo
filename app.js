let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let sassMiddleware = require("node-sass-middleware");
let cors = require("cors");

let indexRouter = require("./routes/index");
let apiRouter = require("./routes/api");
let wsRouter = require("./routes/ws");

let app = express();
let expressWs = require("express-ws")(app);

app.use(cors()); // NOTE: Consider changing from global accept
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/ws", wsRouter);

module.exports = app;
