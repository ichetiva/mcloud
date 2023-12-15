import React from "react";
import css from "./Playlists.module.css";
import LikedPlaylist from "./LikedPlaylist";
import PlaylistTools from "./PlaylistTools";

export const Playlists = () => {
  
  return(
    
    <div className={css.container}>
      <PlaylistTools />
      <div className={css.array}>
        
        
      </div>
      
    </div>
    
    
  )
};
