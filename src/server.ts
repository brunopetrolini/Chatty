import { httpServer } from "./http";
import "./websocket/client";
import "./websocket/admin";

httpServer.listen(3333, () =>
  console.log("🚅 Server running on http://localhost:3333")
);
