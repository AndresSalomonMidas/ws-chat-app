import { Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChatPage from "../pages/ChatPage";

const getRoutes = (isAuth) => [
  {
    path: "/auth",
    element: isAuth ? <Navigate to="/chat" /> : <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/chat",
    element: isAuth ? <ChatPage /> : <Navigate to="/auth/login" />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
];

export default getRoutes;
