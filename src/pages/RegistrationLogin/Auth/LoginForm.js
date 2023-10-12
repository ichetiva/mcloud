import * as React from "react";
import { Navigate } from "react-router-dom";
import App from "../../../components/App";
import { Auth } from "./Auth";
const LoginForm = () => {

      let state = ''
      let Token = localStorage.getItem('Token')
      Token = localStorage.removeItem('Token')
      
      console.log(Token)
      if(Token === null){
        state = true
      }else{
        state = true
      }
      return (
        <div>
          {state === true && <App />}
          {state === false && <Auth />}

        </div>
      );
    
  }

  export default LoginForm