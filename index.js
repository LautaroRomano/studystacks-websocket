const express = require("express");
const WebSocket = require("ws");

const connections = new Set();
const app = express();
app.listen(5001, () => console.log("Api running on por 5001"));

app.get("/", (req, res) => {
  setupWebSocket(req, res);
});

const setupWebSocket = (req, res) => {
  try {
    const wss = new WebSocket.Server({ port: 5000 });

    wss.on("connection", function connection(ws, req) {
      connections.add(ws);

      ws.on("message", function incoming(message) {
        try {
          const data = JSON.parse(message);
          console.log(data);
          for (const connection of connections) {
            connection.send(JSON.stringify(data));
          }
        } catch (error) {
          console.log(error);
        }
      });

      ws.on("close", function close() {
        connections.delete(ws);
      });
    });
    console.log("Web socket is live");
    res.json("Web socket is live");
  } catch (error) {
    console.log(error);
    res.json("Web socket bad :(");
  }
};
