// import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthProvider } from "./contexts/AuthContext";
import LayoutDashbord from "./layouts/LayoutDashbord";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import User from "./pages/User";
import Ovitrampas from "./pages/Ovitrampas";
import Ovitrampa from "./pages/Ovitrampas/Ovitrampa";
import Gallery from "./pages/Gallery";

function App() {
  let { userAuth } = useAuthProvider();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDashbord />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="ovitrampas" element={<Ovitrampas />}>
            <Route path=":ovitrmpaId" element={<Ovitrampa />} />
          </Route>
          <Route
            path="users"
            element={userAuth ? <User /> : <Navigate to="/" />}
          />
          <Route
            path="login"
            element={!userAuth ? <Login /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
