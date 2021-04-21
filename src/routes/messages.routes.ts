import { Router } from "express";

import { MessagesController } from "../controllers/MessagesController";

const messagesRoutes = Router();

const messagesController = new MessagesController();

messagesRoutes.post("/", messagesController.create);
messagesRoutes.get("/:user_id", messagesController.showByUser);

export { messagesRoutes };
