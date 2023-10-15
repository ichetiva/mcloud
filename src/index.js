import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import App from "./components/App";
import "./styles/fonts.css";
import "./styles/common.css";
import Auth from "./pages/RegistrationLogin/Auth";



const root = ReactDOM.createRoot(document.getElementById("root"));
let status
if (localStorage.getItem('Token') !== null && localStorage.getItem('Token') !== "underfined"){
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
