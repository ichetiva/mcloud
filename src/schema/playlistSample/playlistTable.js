import { useState } from 'react'
import css from './playlistTable.module.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
export const PlaylistTable = ({playlist, user, setPlaylistData, setPlaylistId}) => {

const id = playlist.id
 



 const [poster, setPoster] = useState('https://i.pinimg.com/564x/af/8a/27/af8a27fa9edfc7bd449b04327fa741c5.jpg')

 useEffect(() => {
  if(playlist.poster_url){setPoster(playlist.poster_url)}
} , [playlist.poster_url])

    return (
    <Link className={css.playlist} to={`/playlist/${id}`} onClick={() => {setPlaylistId(id); console.log("click changed url")}}>
      <div className={css.playlistTable}  onContextMenu={(e)=> {e.preventDefault()}}>
        <div className={css.poster} style={{backgroundImage: `url(${poster})`}}>

        </div>
        <div className={css.info}>
          <div className={css.title}>{playlist.title}</div>
          <div className={css.author}>{`playlist・${user.data.username}`}</div>
        </div>
      </div> 
{/*      <div className="ContextMenu" style={{visibility:"hidden"}}></div>  */}
    </Link>
      )
} 