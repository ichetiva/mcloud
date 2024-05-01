import css from './PlaylistPage.module.css'
import GetPlaylistsById from '../../../api/Playlists/GetPlaylistByiD'
import { useEffect, useState, useSyncExternalStore } from 'react'

export const PlaylistPage = ({PlaylistId, setPlaylistId}) => {
    const [playlistData, setPlaylistData] = useState()
    useEffect(()=> {GetPlaylistsById(PlaylistId, {setPlaylistData})}, [PlaylistId])
    
    if(playlistData){
    
    const playlist = playlistData.data
    
    return(
        
            <div className={css.playlist}>
            <div>{playlist.id}</div>
            <div>{playlist.title}</div>
            <div>{playlist.description}</div>
            </div>
        )
    } else 
    {
        return(
            <h1>No data</h1>
        )
    }
   
}