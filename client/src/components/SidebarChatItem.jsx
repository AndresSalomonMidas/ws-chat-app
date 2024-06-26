const SidebarChatItem = () => {
  // TODO: add active_chat class to main div
  return (
    <div className="chat_list">
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="avatar"
          />
        </div>
        <div className="chat_ib">
          <h5>Some random name</h5>
          <span className="text-success">Online</span>
          <span className="text-danger">Offline</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarChatItem;
