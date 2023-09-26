import React from "react"
import database from "../../data/playlistExample.json"
import PlaylistLayout from "../../layouts/Playlist"

const PlMapping = () => { 
   const db = database
   
   
    return (
        
        <>
        
         {Object.keys(db)?.length > 0 ? 
            (
                
                <div className="Playlist">
                    <div>
                    {Object.keys(db).map((playlist) => (
                        <PlaylistLayout playlist = {playlist}/>
                    ))}
                    </div>
                </div>
         ) : (
                <div className="empty">
                    <h2>Add playlists here</h2>
                </div>
         )
        
        } 
        </>       
)


}

export default PlMapping