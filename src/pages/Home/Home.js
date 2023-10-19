import css from "./Home.module.css";
import { useState } from 'react'
import HomeSettings from "./SettingsOpen";

export const Home = () => {
  const [openSettings, setOpenSettings] = useState(false)

  return (
    <div>
      <nav className={css.HomeNav}>
       <div className={css.Options} onClick={() => {
        setOpenSettings((prev) => !prev)
        /*
         if(context === settings){
          context = none
        } else {
          context = settings
        }
        */
       }}>
        {
          openSettings && <HomeSettings />
          /*
          if(context === settings){
            HomeSettings /
          }
          */
        }
       </div>
      </nav>
    </div>
  );
};
