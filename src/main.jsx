//import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";
import "./assets/scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  //</React.StrictMode>
);
