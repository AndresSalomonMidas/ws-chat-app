import { useContext } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SendMessageForm from "./SendMessageForm";
import SentMessage from "./SentMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const { state } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div className="msg_history" id="msg_history">
        {state.messages.map((message) =>
          message.to === auth.uid ? (
            <SentMessage key={message._id} message={message} />
          ) : (
            <ReceivedMessage key={message._id} message={message} />
          ),
        )}
      </div>

      <SendMessageForm />
    </div>
  );
};

export default Messages;
