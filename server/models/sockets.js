const { connectedUser, disconnectedUser } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;
  }

  socketsEvents() {
    // Argument socket is like the client connected to the server

    this.io.on("connection", async (socket) => {
      const [isValid, uid] = verifyJWT(socket.handshake.query["x-token"]);

      if (!isValid) {
        console.log("Connection not valid");
        return socket.disconnect();
      }

      await connectedUser(uid);

      // SOCKET EVENTS
      // TODO: Validate JWT - if it is not valid, disconnect
      // TODO: know which user is active by uid
      // TODO: emit all users connected
      // TODO: socket join to specific room
      // TODO: listen when user send a message (personal-message)
      // TODO: handle user disconnection in database

      socket.on("disconnect", async () => {
        await disconnectedUser(uid);
      });
    });
  }
}

module.exports = Sockets;
