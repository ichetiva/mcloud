import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation";
import Playlists from "../Playlists";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import css from "./App.module.css";
import Profile from "../Profile";
import { HomeHead } from "../Header/Home/HomeHead";
import NotFoundHead from "../Header/NotFound";
import SearchBar from "../Header/Search";
import GetUser from "../../api/GetUser/GetUser";
import nullSearch from "../../pages/nullSearch";

export const App = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  const DeleteSecretKey = () => {
    localStorage.removeItem('Token')
  }

  
  GetUser(DeleteSecretKey, refreshPage)
  return (
    <>
    
    <div className={css.container}>
      <div className={css.header}>
        <Routes>
          <Route path="/" element={<HomeHead />} />
          <Route path="/*" element={<NotFoundHead />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </div>
      <div className={css.avatar}>
        <Profile />
      </div>
      <div className={css.nav}>
        <Navigation />
      </div>
      <div className={css.userPlaylists}>
        <Playlists />
      </div>
      <div className={css.pages}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route exact path="/search" Component={nullSearch} />
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