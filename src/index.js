import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./styles/fonts.css";
import "./styles/common.css";
import Login from "./pages/RegistrationLogin/Login";
import Registration from "./pages/RegistrationLogin/Registration";
import Auth from "./pages/RegistrationLogin/Auth";
import LoginForm from "./pages/RegistrationLogin/Auth/LoginForm";
import { Navigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
let status

if (localStorage.getItem('Token') !== null){
  status = true
} else {
  status = false
}

root.render(
  
  <BrowserRouter>
  {
    status
    ? <App /> 
    : <Auth />
  }
  </BrowserRouter>
);
