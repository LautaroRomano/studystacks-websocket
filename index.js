const WebSocket = require("ws");

const connections = new Set();

try {
  const wss = new WebSocket.Server({ port: 403 });

  wss.on("connection", function connection(ws, req) {
    connections.add(ws);

    ws.on("message", function incoming(message) {
      try {
        const data = JSON.parse(message);
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
  console.log('Web socket is live')
} catch (error) {
  console.log(error);
}
