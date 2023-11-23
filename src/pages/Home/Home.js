import { AddMusic } from "./AddNewTrack/AddMusic";
import css from "./Home.module.css";
import { useState } from 'react'
import Alert from "../../components/Alert";
import Track from "../../schema/trackSample/"

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
  return (
    <div className={css.home}>
      
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
       
      <div className={css.body}>
      <Track 
        id="1"
        poster="blob"
        title="Color"
        author="SoraSan"
        date="22.04.2023"
        time="15:25"
        />
      </div>

    {/* passing notification data*/}
    {alertClose && <Alert title={alertProperties[0][0]} description={alertProperties[0][1]} close={closeAlert} />}
    </div>
  );
};
