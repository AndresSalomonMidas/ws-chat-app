import { createBrowserRouter } from "react-router-dom";
import getRoutes from "./routes";

const getRouter = () => {
  const browserRouter = createBrowserRouter(getRoutes());

  return browserRouter;
};

export default getRouter;
