import express from "express";
import { createServer } from "http";
import path from "path";
import { Server, Socket } from "socket.io";

import "./database";
import { router } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");

app.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
});

const httpServer = createServer(app);
const ioServer = new Server(httpServer);

ioServer.on("connection", (socket: Socket) => {
  console.log("Se conectou", socket.id);
});

app.use(express.json());

app.use(router);

httpServer.listen(3333, () =>
  console.log("🚅 Server running on http://localhost:3333")
);
