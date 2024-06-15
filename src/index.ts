import http from "http";
import fs from "fs/promises";
import { WebSocketServer } from "ws";

let index = "";

const server = http.createServer((req, res) => {
  //serve index.html
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    ws.send(data);
    console.log("received: %s", data);
  });

  ws.send("something");
});

async function main() {
  index = await fs.readFile("index.html", "utf-8");
  server.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
}

main();
