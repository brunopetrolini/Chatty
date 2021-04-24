import { Socket } from "socket.io";

import { ioServer } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

interface IParams {
  text: string;
  email: string;
}

ioServer.on("connect", (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      const connection = await connectionsService.findUserId(userExists.id);

      if (!connection) {
        await connectionsService.create({ socket_id, user_id: userExists.id });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }

      user_id = userExists.id;
    }

    await messagesService.create({ text, user_id });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionsService.findAllWithoutAdmin();
    ioServer.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user_id }: any = await connectionsService.findBySocketId(socket.id);

    const message = await messagesService.create({
      text,
      user_id,
    });

    ioServer.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });
  });
});
