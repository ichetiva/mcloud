import { useEffect, useState } from 'react'
import css from './allTracks.module.css'
export const AllTracks = ({track, id, setMusic, setPiece, piece}) => {
  console.log(setMusic)
  const [color, setColor] = useState()
  console.log(track)
  useEffect(() => {
    if(id === piece){
      setColor({backgroundColor:"#eeeeee4d"})
    }
    if(id !== piece){
      setColor()
    }
  } , [piece,id])
  
  if(track){
    return(
        <div className={css.songs} style={color}>
          <div className={css.ids}>{id + 1}</div>
            <div className={css.poster} style={{backgroundImage: `url(${track.poster_url})`}} onClick={() => {setMusic(track.track_url); setPiece(id)}}>
               <div className={css.shadow}>
                  <div className={css.playbutton}></div>
                </div>
            </div>
          <div className={css.label}>
            <div className={css.title}>{track.title}</div>
            <div className={css.author}>{track.user_id}</div>
          </div>
          <div className={css.album}>Album</div>
          {/*<div className={css.date}>{track.updated_at}</div>*/}
          {/*<div className={css.heart}></div>*/}
          <div className={css.time}>time</div>
          {/*<div className={css.settings}></div>*/}
        </div>
    
  )
  }
}