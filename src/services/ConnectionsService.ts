import { getCustomRepository } from "typeorm";

import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnection {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: ConnectionsRepository;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({
    socket_id,
    user_id,
    admin_id,
    id,
  }: IConnection): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findUserId(user_id: string): Promise<Connection | undefined> {
    const connection = await this.connectionsRepository.findOne({ user_id });
    return connection;
  }

  async findAllWithoutAdmin(): Promise<Connection[]> {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"],
    });

    return connections;
  }
}

export { ConnectionsService };
