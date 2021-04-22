import { httpServer } from "./http";
import "./websocket/client";

httpServer.listen(3333, () =>
  console.log("🚅 Server running on http://localhost:3333")
);
