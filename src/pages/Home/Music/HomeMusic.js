import AllTracks from "../../../schema/trackHomeSample";
import { useState } from "react";
import css from './HomeMusic.module.css'
export const GetHomeMusic = ({musicData, setMusic}) => {

    const [piece, setPiece] = useState()
    if(musicData.data){
        const database = musicData.data
        if(Object.keys(database)?.length > 0) {
        return (
        <div className={css.grid}>
            {Object.entries(database).map((track, index) => (
                <AllTracks key={index} track={track[1]} id={index} setMusic={setMusic} setPiece={setPiece} piece={piece}/>
            ))}
        </div>
    )
    }
    }    
}
    
    


