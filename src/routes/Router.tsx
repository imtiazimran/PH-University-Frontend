import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./admin.routes";
import { facultyRoutes } from "./faculty.routes";
import { studentRoute } from "./student.routes";
import PrivetRoute from "../components/layout/PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <PrivetRoute> <App /></PrivetRoute>,
    children: routesGenerator(adminRoutes),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routesGenerator(facultyRoutes),
  },
{
  path: "/student",
  element: <App />,
  children: routesGenerator(studentRoute),
},
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
