import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation";
import Playlists from "../Playlists";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import css from "./App.module.css";
import ProfileNav from "../ProfileNav";
import { useState } from "react";

export const App = () => {

  const [isActive, SetIsActive] = useState(false);
  const handleClick = () => {
    SetIsActive(true)
    
  }

  return (
    <>
    <div className={css.container}>
      <div className={css.header}></div>
      <div className={css.avatar} onClick={handleClick}>
        <ProfileNav className={css.profile} />
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
        </Routes>
      </div>
    </div>

    <div className={css.footer}>
        <a className={css.temporary} href="https://github.com/ichetiva/mcloud">Source code</a>
          <br></br>
        <a className={css.temporary} href="https://youtu.be/ymdhRMiMGK0?si=C_89Ve64LDsySp93">Main info</a>
    </div>
      </>

    // <div className={css.CoreBody}>
    //   <div className={css.Split}>
    //     <sidebar id={css.sidebar}>
    //       <div className={css.LeftNav}>
    //         <HomeSearch />
    //       </div>
    //       <div className={css.Playlist}>
    //         <div>
    //           <Playlists />
    //         </div>
    //       </div>
    //     </sidebar>

    //     <div id={css.container}>
    //       <div className={css.Split2}>
    //         <div className={css.MainNav}>
    //           <NavRoutes />
    //         </div>
    //         <div className={css.AvatarSpace}>
    //           <div className={css.Avatar}></div>
    //         </div>
    //       </div>

    //       <div className={css.HomeBar}>
    //         <MainRoutes />
    //       </div>
    //     </div>
    //   </div>
    //   <div className={css.BottomNav}></div>
    // </div>
  );
};
