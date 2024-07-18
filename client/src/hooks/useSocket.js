import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState(null);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token") || "";

    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true, // Keep the connection
      forceNew: true, // Force a new connection every time the socket is disconnected
      query: {
        "x-token": token,
      },
    });

    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);

    socket?.on("connect", () => {
      setOnline(true);
    });

    socket?.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online, connectSocket, disconnectSocket };
};
