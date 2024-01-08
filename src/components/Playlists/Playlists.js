import React from "react";
import css from "./Playlists.module.css";
import PlaylistTools from "./PlaylistTools";
import PlaylistArray from "./PlaylistArray";
export const Playlists = () => {
  
  return(
    
    <div className={css.container}>
      <PlaylistTools />
      <div className={css.array}>
         <PlaylistArray />
      </div>
    </div>
    
    
  )
};
