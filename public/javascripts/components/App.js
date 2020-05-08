import React from "react";
import "../../stylesheets/App.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let ws = new WebSocket("ws://localhost:8000");

        ws.addEventListener("open", (e) => {
            ws.send("Sending from react");
        })

        ws.addEventListener("message", (e) => {
            console.log("React got message");
            console.log("Data: " + e.data);
        })
    }

    render() {
        return (
            <h1>Client!</h1>
        );
    }
}
