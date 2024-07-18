import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

const SidebarChatItem = ({ user }) => {
  const { state, dispatch } = useContext(ChatContext);
  const activeChat = state.activeChat === user.uid;

  const handleActiveChat = async () => {
    dispatch({ type: types.ACTIVE_CHAT, payload: user.uid });

    // Load chat messages
    const response = await fetchWithToken(`messages/${user.uid}`);
    dispatch({ type: types.LOAD_MESSAGES, payload: response.messages });

    scrollToBottom("msg_history");
  };

  return (
    <div
      className={`chat_list ${activeChat && "active_chat"}`}
      onClick={handleActiveChat}
      onKeyDown={handleActiveChat}
      role="button"
      tabIndex={0}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="avatar"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarChatItem;
