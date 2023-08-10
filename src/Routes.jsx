import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuthProvider } from "./contexts/AuthContext";
import LayoutDashbord from "./layouts/LayoutDashbord";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import User from "./pages/User";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Ovitrampas from "./pages/Ovitrampas";
import Cycle from "./pages/Ovitrampas/Cycles";
import Image from "./pages/Ovitrampas/Cycles/Images";
import Prediction from "./pages/Ovitrampas/Cycles/Images/Prediction";


export default function routes() {
  let { userAuth } = useAuthProvider();

  const router = createBrowserRouter([
    {
      element: <LayoutDashbord />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/ovitrampa",
          element: userAuth ? <Ovitrampas /> : <Navigate to="/" />,
        },
        {
          path: "/ovitrampa/:ovitrampaId",
          element: userAuth ? <Cycle /> : <Navigate to="/" />,
        },
        {
          path: "/ovitrampa/:ovitrampaId/cycle/:cycleId",
          element: userAuth ? <Image /> : <Navigate to="/" />,
        },
        {
          path: "/ovitrampa/:ovitrampaId/cycle/:cycleId/prediction/:ImageId",
          element: userAuth ? <Prediction /> : <Navigate to="/" />,
        },
        {
          path: "/user",
          element: userAuth ? <User /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !userAuth ? <Login /> : <Navigate to="/" />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
