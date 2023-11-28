import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation";
import SearchPage from "../../pages/Search";
import Playlists from "../Playlists";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import css from "./App.module.css";
import Profile from "../Profile";
import { HomeHead } from "../Header/Home/HomeHead";
import NotFoundHead from "../Header/NotFound";
import SearchBar from "../Header/Search";
import GetUser from "../../api/GetUser/GetUser";
import { useEffect, useState } from "react";
import AllMusic from "../../api/GetAllMusic/Music";
import TokenCheck from "../../api/auth/authCheck/TokenCheck";

export const App = () => {
  const [user, setUser] = useState([])
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [searchStatus, setSearchStatus] = useState(false)
  const [header, setHeader] = useState(["#353941" , "none"]); /* is for header to change disign*/
  function refreshPage() {
    window.location.reload(false);
  }
  const DeleteSecretKey = () => {
    localStorage.removeItem('Token')
  }

  

  const [timeout, setTimeout] = useState(false)
  useEffect(() => {
    AllMusic({setData})
    setTimeout(false)
    TokenCheck(DeleteSecretKey)
    GetUser({setUser})
  },[timeout])

  
  
  
  return (
    <> 
    <div className={css.container}>
      <div className={css.header} style={{
        background: header[0][0] ,
        boxShadow: header[0][1]
         }}>
        <Routes>
          <Route path="/" element={<HomeHead user={user}/>} />
          <Route path="/*" element={<NotFoundHead />} />
          <Route path="/search" element={<SearchBar setSearchStatus = {setSearchStatus} setSearchData={setSearchData} />} />
        </Routes>
      </div>
      <div className={css.avatar}>
        <Profile />
      </div>
      <div className={css.nav}>
        <Navigation setHeader={setHeader}/>
      </div>
      <div className={css.userPlaylists}>
        <Playlists />
      </div>
      <div className={css.pages}>
        <Routes>
          <Route path="/" element={<Home data={data}/>} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/search" element={<SearchPage status={searchStatus} searchData={searchData}/>} />
        </Routes>
      </div>
        
    </div>
    <div className={css.footer}>
        <a className={css.temporary} href="https://github.com/ichetiva/mcloud">Source code</a>
          <br></br>
        <a className={css.temporary} href="https://youtu.be/ymdhRMiMGK0?si=C_89Ve64LDsySp93">Main info</a>
    </div>
    
      </>
  );
};