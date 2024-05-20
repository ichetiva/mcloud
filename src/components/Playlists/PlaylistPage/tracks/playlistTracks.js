import AllTracks from "../../../../schema/trackHomeSample";
import { useState } from "react";
import css from './playlistTracks.module.css'
import LoadingSM from "../../../loadingScreen/loading";
export const GetPlaylistMusic = ({musicData, setMusic}) => {
    
    const [piece, setPiece] = useState()
    if(musicData){
        const database = musicData
        if(Object.keys(database)?.length > 0) {
        return (

        <div className={css.grid}>
            {Object.entries(database).map((track, index) => (
                <AllTracks key={index} track={track[1]} id={index} setMusic={setMusic} setPiece={setPiece} piece={piece}/>
            ))}
        </div>
    )
    }
    }     else {
        return <>
               <div className={css.loading}>
                    <h3>Working on it....</h3>
                    <LoadingSM width="70px" height="70px"/>
               </div> 
               </>
       }
}