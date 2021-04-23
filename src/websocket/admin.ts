import { Socket } from "socket.io";

import { ioServer } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";

ioServer.on("connect", async (socket: Socket) => {
  const connectionsService = new ConnectionsService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  ioServer.emit("admin_list_all_users", allConnectionsWithoutAdmin);
});
