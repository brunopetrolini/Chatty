import { Request, Response, Router } from "express";
import { getCustomRepository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";

const settingsRoutes = Router();

settingsRoutes.post("/settings", (request: Request, response: Response) => {
  const { chat, username } = request.body;

  const settingsRepository = getCustomRepository(SettingsRepository);

  const settings = settingsRepository.create({
    chat,
    username,
  });

  settingsRepository.save(settings);

  return response.status(201).send();
});

export { settingsRoutes };
