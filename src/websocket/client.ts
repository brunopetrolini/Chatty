import { Socket } from "socket.io";

import { ioServer } from "../http";

ioServer.on("connect", (socket: Socket) => {
  socket.on("client_first_access", (params) => {
    console.log(params);
  });
});
