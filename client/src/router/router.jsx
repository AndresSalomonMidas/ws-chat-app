import { useContext } from "react";
import { createBrowserRouter } from "react-router-dom";
import getRoutes from "./routes";
import { AuthContext } from "../context/AuthContext";

const getRouter = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { auth } = useContext(AuthContext);

  const isAuth = auth.logged;
  const browserRouter = createBrowserRouter(getRoutes(isAuth));

  return browserRouter;
};

export default getRouter;
