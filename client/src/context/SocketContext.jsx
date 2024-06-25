import { createContext, useContext, useEffect, useMemo } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "../context/AuthContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:8080",
  );
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  const value = useMemo(() => ({ socket, online }), [socket, online]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
