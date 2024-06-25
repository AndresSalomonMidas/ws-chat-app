import { RouterProvider } from "react-router-dom";
import getRouter from "./router/router";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <RouterProvider router={getRouter()} />
    </SocketProvider>
  );
}

export default App;
