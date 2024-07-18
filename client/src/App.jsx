import { RouterProvider } from "react-router-dom";
import getRouter from "./router/router";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/chat/ChatContext";

function App() {
  return (
    <ChatProvider>
      <SocketProvider>
        <RouterProvider router={getRouter()} />
      </SocketProvider>
    </ChatProvider>
  );
}

export default App;
