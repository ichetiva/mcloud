import { AddMusic } from "./AddNewTrack/AddMusic";
import css from "./Home.module.css";
import { useState } from 'react'
import Alert from "../../components/Alert";

export const Home = () => {
  const [alertClose, setAlertClose] = useState(false)
  const [alertProperties, setAlertProperties] = useState(["hello" , "goodbye"])
  const [style, setStyle] = useState(`Options`)
  const [openTab, setOpenTab] = useState(false)
  const closeModal = () => setOpenTab(false)

  const closeAlert = () => {
    setAlertClose(false)
  }
  const openAlert = () => {
    setAlertClose(true)
  }
  const alertPropsChange = (title , description) => {
    setAlertProperties([title , description])
  }
  console.log(alertProperties[0][0])
  return (
    <div>
      
      <nav className={css.HomeNav}>
       <div className={css.Options}  onClick={() => 
       { 
        
        setOpenTab(true)
        setStyle("OptionsGray")
        }}></div>
       {
          openTab && <AddMusic closeModal={ closeModal } openAlert = { openAlert } alertPropsChange = { alertPropsChange }/>
          
        }
      </nav>

      {/* test ->*/}
      <div className={css.songs}>
          <div className={css.ids}>1</div>
          <div className={css.poster}></div>
          <div className={css.label}>
            <div className={css.title}>Color</div>
            <div className={css.author}>Sorasan</div>
          </div>
          <div className={css.date}>22.01.2023</div>
          <div className={css.heart}></div>
          <div className={css.time}>3:35</div>
          <div className={css.settings}>s</div>
      </div>
      {/* <- test */}
      
    {alertClose && <Alert title={alertProperties[0][0]} description={alertProperties[0][1]} close={closeAlert} />}
    </div>
  );
};
