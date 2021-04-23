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
  });
});
