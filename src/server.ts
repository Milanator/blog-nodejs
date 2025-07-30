import app from "./app.ts";
import config from "./config/config.ts";
import database from "./plugins/database.ts";
import websocket from "./plugins/websocket.ts";

database().then(() => {
  const server = app.listen(config.port);

  const io = websocket.init(server);

  io.on("connection", (connection) => {
    console.log("🟢 Socket.io - client connected");
  });
});
