const {
  connectedUser,
  disconnectedUser,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
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
      // Join user to a room with an uid as room's name
      socket.join(uid);
      // TODO: Validate JWT - if it is not valid, disconnect
      // TODO: know which user is active by uid
      // Emit all users connected
      this.io.emit("active-users", await getUsers());

      // Listen when user send a message (personal-message)
      socket.on("personal-message", async (payload) => {
        // Save message in DB
        const message = await saveMessage(payload);
        // Emit to the selected user
        this.io.to(payload.to).emit("personal-message", message);
        // Emit to the sender (this can be done in the client too)
        this.io.to(payload.from).emit("personal-message", message);
      });

      // Handle user disconnection in database
      socket.on("disconnect", async () => {
        await disconnectedUser(uid);

        // When user disconnect, emit to all users
        this.io.emit("active-users", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
