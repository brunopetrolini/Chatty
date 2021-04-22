import { Request, Response } from "express";

import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();

    try {
      const setting = await settingsService.create({ chat, username });
      return response.status(201).json(setting);
    } catch (error) {
      return response.status(400).json({ err: error.message });
    }
  }

  async findByUsername(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const userSettings = await settingsService.findByUsername(username);
    return response.status(200).json(userSettings);
  }
}

export { SettingsController };
