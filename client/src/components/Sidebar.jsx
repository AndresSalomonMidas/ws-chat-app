import { useContext } from "react";
import SidebarChatItem from "./SidebarChatItem";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { state } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {/* Chats */}
      {state.users
        // Filter out the current user
        .filter((user) => user.uid !== auth.uid)
        .map((user) => (
          <SidebarChatItem key={user.uid} user={user} />
        ))}

      {/* Scroll space */}
      <div className="extra_space"></div>
    </div>
  );
};

export default Sidebar;
