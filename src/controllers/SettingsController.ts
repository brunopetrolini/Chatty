import { Request, Response } from "express";

import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();
    const setting = await settingsService.create({ chat, username });

    return response.status(201).json(setting);
  }
}

export { SettingsController };
