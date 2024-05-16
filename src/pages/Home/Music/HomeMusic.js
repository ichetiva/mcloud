import AllTracks from "../../../schema/trackHomeSample";
import { useState } from "react";
import css from './HomeMusic.module.css'
import LoadingSM from "../../../components/loadingScreen/loading";
export const GetHomeMusic = ({musicData, setMusic}) => {

    const [piece, setPiece] = useState()
    if(musicData.data){
        const database = musicData.data
        if(Object.keys(database)?.length > 0) {
        return (

        <div className={css.grid}>
            <div className={css.hashtag}>
                    <div className={css.id}>id</div>
                    <div className={css.posterBlock}>poster</div>
                    <div className={css.labels}>text</div>
                    <div className={css.album}>album</div>
                    <div className={css.time}>time</div>
                </div>
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
    
    


