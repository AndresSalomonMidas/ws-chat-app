class Sockets {
  constructor(io) {
    this.io = io;
  }

  socketsEvents() {
    // Argument socket is like the client connected to the server
    // eslint-disable-next-line no-unused-vars
    this.io.on("connection", (socket) => {
      // console.log('Client connected');
      // TODO: Validate JWT - if it is not valid, disconnect
      // TODO: know which user is active by uid
      // TODO: emit all users connected
      // TODO: socket join to specific room
      // TODO: listen when user send a message (personal-message)
      // TODO: handle user disconnection in database
      // SOCKET EVENTS
    });
  }
}

module.exports = Sockets;
