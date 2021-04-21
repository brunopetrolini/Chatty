import { Router } from "express";

import { SettingsController } from "../controllers/SettingsController";

const settingsRoutes = Router();

const settingsController = new SettingsController();
settingsRoutes.post("/", settingsController.handle);

export { settingsRoutes };
