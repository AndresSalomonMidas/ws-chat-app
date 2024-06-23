import SidebarChatItem from "./SidebarChatItem";

const Sidebar = () => {
  const chats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="inbox_chat">
      {/* Chats */}
      {chats.map((chat) => (
        <SidebarChatItem key={chat} />
      ))}

      {/* Scroll space */}
      <div className="extra_space"></div>
    </div>
  );
};

export default Sidebar;
