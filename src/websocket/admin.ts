import { Socket } from "socket.io";

import { ioServer } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

ioServer.on("connect", async (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  ioServer.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages);
  });

  socket.on("admin_send_message", async (params) => {
    const { user_id, text } = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { socket_id }: any = await connectionsService.findUserId(user_id);

    ioServer.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id,
    });
  });

  socket.on("admin_user_in_support", async (params) => {
    const { user_id } = params;

    await connectionsService.updateAdminId(user_id, socket.id);

    ioServer.emit("admin_list_all_users", allConnectionsWithoutAdmin);
  });
});
