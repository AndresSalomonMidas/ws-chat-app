const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");

const socketIo = require("socket.io");
const Sockets = require("./sockets");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // Connect to MongoDB
    dbConnection();

    // Http server
    this.server = http.createServer(this.app);

    // Socket config
    this.io = socketIo(this.server);

    // Init Sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    // Read and parse body
    this.app.use(express.json());

    // REST API
    this.app.use("/api/login", require("../routes/auth"));
    this.app.use("/api/messages", require("../routes/messages"));
  }

  execute() {
    // Init middlewares
    this.middlewares();

    // Sockets events
    this.sockets.socketsEvents();

    // Init server
    this.server.listen(this.port, () => {
      console.log("Server listening on port: " + this.port);
    });
  }
}

module.exports = Server;
