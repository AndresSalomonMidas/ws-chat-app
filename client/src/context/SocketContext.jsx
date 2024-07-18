import { createContext, useContext, useEffect, useMemo } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "./chat/ChatContext";
import { types } from "../types/types";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:8080",
  );
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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

  useEffect(() => {
    // Listen to all connected users
    socket?.on("active-users", (users) => {
      dispatch({
        type: types.ACTIVE_USERS,
        payload: users,
      });
    });

    // Listen to new messages
    socket?.on("personal-message", (message) => {
      dispatch({
        type: types.NEW_MESSAGE,
        payload: message,
      });

      scrollToBottomAnimated("msg_history");
    });
  }, [socket, dispatch]);

  useEffect(() => {
    // Listen to all connected users
    socket?.on("active-users", (users) => {
      dispatch({
        type: types.ACTIVE_USERS,
        payload: users,
      });
    });

    // Listen to new messages
    socket?.on("personal-message", (message) => {
      dispatch({
        type: types.NEW_MESSAGE,
        payload: message,
      });
      // TODO: move scroll to end
    });
  }, [socket, dispatch]);

  const value = useMemo(() => ({ socket, online }), [socket, online]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
