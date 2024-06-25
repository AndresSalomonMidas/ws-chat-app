import { useContext, useEffect } from "react";
import ChatSelect from "../components/ChatSelect";
import InboxPeople from "../components/InboxPeople";
import Messages from "../components/Messages";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "../styles/chat.css";

const ChatPage = () => {
  const { verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const showMessages = true;

  const verifyTokenAndRedirect = async () => {
    const ok = await verifyToken();
    if (!ok) {
      navigate("/auth/login", { replace: true });
    }
  };

  useEffect(() => {
    verifyTokenAndRedirect();
  }, []);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        {showMessages === true ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  );
};

export default ChatPage;
