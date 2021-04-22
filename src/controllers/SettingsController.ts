import { Request, Response } from "express";

import { SettingsService } from "../services/SettingsService";

class SettingsController {
  private settingsService: SettingsService;

  constructor() {
    this.settingsService = new SettingsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    try {
      const setting = await this.settingsService.create({ chat, username });
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

    const userSettings = await this.settingsService.findByUsername(username);
    return response.status(200).json(userSettings);
  }
}

export { SettingsController };
