import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation";
import Playlists from "../Playlists";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import css from "./App.module.css";
import Profile from "../Profile";
import Login from "../../pages/RegistrationLogin/Login";
import Registration from "../../pages/RegistrationLogin/Registration";
import { HomeHead } from "../Header/Home/HomeHead";
import NotFoundHead from "../Header/NotFound";
import LoginHead from "../Header/Auth/SignIn";
import { RegistrationHead } from "../Header/Auth/SignUp/RegistrationHead";
import SearchBar from "../Header/Search";


export const App = () => {
  return (
    <>
    <div className={css.container}>
      <div className={css.header}>
        <Routes>
          <Route path="/" element={<HomeHead />} />
          <Route path="/*" element={<NotFoundHead />} />
          <Route path="/SignIn" element={<LoginHead />} />
          <Route path="/SignUp" element={<RegistrationHead/>} />
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
          <Route path="/SignIn" element={<Login />} />
          <Route path="/SignUp" element={<Registration />} />
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
