import { useState } from 'react'
import css from './playlistTable.module.css'
import { useEffect } from 'react'
export const PlaylistTable = ({playlist, user}) => {
  
  function mouseX(evt) {
    if (evt.pageX) {
      return evt.pageX;
    } else if (evt.clientX) {
      return evt.clientX + (document.documentElement.scrollLeft ?
        document.documentElement.scrollLeft :
        document.body.scrollLeft);
    } else {
      return null;
    }
  }
  
  function mouseY(evt) {
    if (evt.pageY) {
      return evt.pageY;
    } else if (evt.clientY) {
      return evt.clientY + (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);
    } else {
      return null;
    }
  }


 const [poster, setPoster] = useState('https://i.pinimg.com/564x/af/8a/27/af8a27fa9edfc7bd449b04327fa741c5.jpg')

 useEffect(() => {
  if(playlist.poster_url){setPoster(playlist.poster_url)}
} , [playlist.poster_url])

    return (
      <div className={css.playlist}>
      <div className={css.playlistTable}  onContextMenu={(e)=> {e.preventDefault()}}>
        <div className={css.poster} style={{backgroundImage: `url(${poster})`}}>

        </div>
        <div className={css.info}>
          <div className={css.title}>{playlist.title}</div>
          <div className={css.author}>{`playlist・${user.data.username}`}</div>
        </div>
      </div> 
      <div className="ContextMenu" style={{visibility:"hidden"}}></div>
      </div>
      )
} 