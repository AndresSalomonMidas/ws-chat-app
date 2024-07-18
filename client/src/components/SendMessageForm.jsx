import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    socket.emit("personal-message", {
      from: auth.uid,
      to: state.activeChat,
      message,
    });

    // TODO: dispatch the message

    setMessage("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            onChange={onChange}
            value={message}
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessageForm;
