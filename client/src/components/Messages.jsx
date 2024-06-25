import ReceivedMessage from "./ReceivedMessage";
import SendMessageForm from "./SendMessageForm";
import SentMessage from "./SentMessage";

const Messages = () => {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="mesgs">
      <div className="msg_history">
        {messages.map((message) =>
          message % 2 === 0 ? (
            <SentMessage key={message} />
          ) : (
            <ReceivedMessage key={message} />
          ),
        )}
      </div>

      <SendMessageForm />
    </div>
  );
};

export default Messages;
