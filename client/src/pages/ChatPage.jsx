import ChatSelect from "../components/ChatSelect";
import InboxPeople from "../components/InboxPeople";
import Messages from "../components/Messages";

import "../styles/chat.css";

const ChatPage = () => {
  const showMessages = true;

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        { showMessages === true ? <Messages /> : <ChatSelect /> }
      </div>
    </div>
  );
};

export default ChatPage;
