import css from './PlaylistPage.module.css'
import GetPlaylistsById from '../../../api/Playlists/GetPlaylistByiD'
import { useEffect, useState, useSyncExternalStore } from 'react'
import LoadingSM from '../../loadingScreen/loading'
import ColorThief from 'colorthief'
import GetUserById from '../../../api/GetUser/GetUserById'
import GetPlaylistMusic from './tracks'

export const PlaylistPage = ({PlaylistId, setMusic}) => {
    
    const [error, setError] = useState()
    const [playlistData, setPlaylistData] = useState()
    const [username, setUsername] = useState("user")
    useEffect(()=> {GetPlaylistsById(PlaylistId, {setPlaylistData, setError})}, [PlaylistId])
    console.log(username)
    if(playlistData){
   
    const playlist = playlistData.data 
    
    GetUserById(playlist.user_id, {setUsername})
        
    
    let poster = null
    let privacy = null

        if(playlist.is_private === true){
        privacy = "Private"
    }
    else if(playlist.is_private === false){
        privacy = "Public"
    }

        if(!playlist.poster_url){
            poster = "https://i.pinimg.com/564x/af/8a/27/af8a27fa9edfc7bd449b04327fa741c5.jpg"
        }
        else{ 
            poster = playlist.poster_url
        }
        
    return(
            
            <div className={css.playlist}>
                <div className={css.header}>
                    <div className={css.poster}>
                        <div className={css.image} id='myImage' style={{backgroundImage:`url(${poster})`}}></div>
                    </div>
                    <div className={css.props}>
                        <div className={css.privacy}>{privacy} | Playlist by {username}</div>
                        <div className={css.title}>{playlist.title} </div>
                        <div className={css.description}>{playlist.description} </div>
                    </div>
                </div>
                <div className={css.hashtag}>
                    <div className={css.id}>id</div>
                    <div className={css.posterBlock}>poster</div>
                    <div className={css.labels}>text</div>
                    <div className={css.album}>album</div>
                    <div className={css.time}>time</div>
                </div>
                <div className={css.body}>
                    <GetPlaylistMusic musicData={playlist.tracks} setMusic={setMusic}/>
                </div>
            </div>
        )
    } else 
    {
        return(
            <div className={css.loading}>
                {error
                ?<h1>{error}</h1>
                :<LoadingSM width="55px" height="55px"/>
                }
            </div>
            
        )
    }
   
}