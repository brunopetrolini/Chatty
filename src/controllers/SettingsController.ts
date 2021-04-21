import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({
      chat,
      username,
    });

    settingsRepository.save(settings);

    return response.status(201).send();
  }
}

export { SettingsController };
