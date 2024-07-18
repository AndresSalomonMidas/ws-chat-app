import { createContext, useMemo, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext();

const INITIAL_STATE = {
  uid: "",
  activeChat: null, // uid of user chat to send messages
  users: [], // all users from DB
  messages: [], // selected chat messages
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const contextObj = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ChatContext.Provider value={contextObj}>{children}</ChatContext.Provider>
  );
};
