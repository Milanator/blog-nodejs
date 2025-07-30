import { FRONTEND_ORIGIN } from "./../constants.ts";
import { Server } from "socket.io";

let websocket: Server;

export default {
  init: (server: any): Server => {
    websocket = new Server(server, {
      cors: { origin: FRONTEND_ORIGIN },
    });

    return websocket;
  },
  getInstance: (): Server => {
    if (!websocket) {
      throw new Error("Socket.io not initialized!");
    }

    return websocket;
  },
};
