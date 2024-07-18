import { types } from "../../types/types";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.ACTIVE_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case types.ACTIVE_CHAT:
      // If the chat is already active, return the state and avoid resetting messages
      if (state.activeChat === action.payload) return state;

      return {
        ...state,
        activeChat: action.payload,
        messages: [], // reset messages
      };

    case types.NEW_MESSAGE:
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        // If the message is from the active chat, add it to the messages
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        // If the message is not from the active chat, return the state
        // Here we can handle notifications or another type of alert
        return state;
      }

    case types.LOAD_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case types.LOGOUT:
      return {
        ...state,
        uid: "",
        activeChat: null,
        messages: [],
        users: [],
      };

    default:
      return state;
  }
};
