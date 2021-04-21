import { getCustomRepository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";

interface IRequest {
  chat: boolean;
  username: string;
}

class SettingsService {
  async execute({ chat, username }: IRequest): Promise<void> {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({
      chat,
      username,
    });

    settingsRepository.save(settings);
  }
}

export { SettingsService };
