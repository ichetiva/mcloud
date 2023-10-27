import { AddMusic } from "./AddNewTrack/AddMusic";
import css from "./Home.module.css";
import { useState } from 'react'



export const Home = () => {

  const [style, setStyle] = useState(`Options`)
  const [openTab, setOpenTab] = useState(false)

  const closeModal = () => setOpenTab(false)

  return (
    <div>
      <nav className={css.HomeNav}>
       <div className={css.Options}  onClick={() => 
       { 
        setOpenTab(true)
        setStyle("OptionsGray")
        }}></div>
       {
          openTab && <AddMusic closeModal={ closeModal } />
          /*
          if(context === settings){
            HomeSettings /
          }
          */
        }
      </nav>
    </div>
  );
};
