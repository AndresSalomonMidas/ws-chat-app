import { useCallback, useContext, useEffect } from "react";
import ChatSelect from "../components/ChatSelect";
import InboxPeople from "../components/InboxPeople";
import Messages from "../components/Messages";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

import "../styles/chat.css";

const ChatPage = () => {
  const { verifyToken } = useContext(AuthContext);
  const { state } = useContext(ChatContext);
  const navigate = useNavigate();

  const verifyTokenAndRedirect = useCallback(async () => {
    const ok = await verifyToken();
    if (!ok) {
      navigate("/auth/login", { replace: true });
    }
  }, [verifyToken]);

  useEffect(() => {
    verifyTokenAndRedirect();
  }, []);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        {state.activeChat ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  );
};

export default ChatPage;
