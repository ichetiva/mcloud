import css from "./ProfileOpen.module.css"
import { Link } from "react-router-dom";
import Login from "../../../pages/RegistrationLogin/Login";

import { useState } from "react";

export const ProfileOpen = () => {

  function refreshPage() {
    window.location.reload(false);
  }

  async function RemoveUser() {
    await localStorage.removeItem('Token')
    refreshPage()
  }

  return (
    
      <div className={css.links}>
        
      <button className={css.content} onClick={() => {
        RemoveUser()
      }}>Exit</button>
        
        
      </div>
  );
};