import { Router } from "express";

import { settingsRoutes } from "./settings.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/settings", settingsRoutes);
router.use("/users", usersRoutes);

export { router };
