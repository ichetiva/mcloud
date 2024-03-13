import css from './PlaylistTools.module.css'
import { useState } from 'react'
import PlConstructor from './PlaylistConstructor'

export const PlaylistTools = ({data, setMusic}) => {
    const [openTab, setOpenTab] = useState(false)
    const closeTab = () => {
        setOpenTab(false)
    }
    return (
        <>
        <div className={css.container}>
            <div className={css.icon}></div>
            <h3>Library</h3> 
            <div className={css.createPlaylist} onClick={() => {
                setOpenTab(true)
            }}>
             
            </div> 
        </div>
        {openTab && <PlConstructor closeTab = {closeTab} data={data} setMusic={setMusic}/>}
        </>
    )
}