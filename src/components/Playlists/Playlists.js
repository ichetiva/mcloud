import React from "react";
import css from "./Playlists.module.css";
import PlaylistTools from "./PlaylistTools";
import PlaylistArray from "./PlaylistArray";
export const Playlists = ({data, setMusic, user, playlists}) => {
  
  return(
    
    <div className={css.container}>
      <PlaylistTools data={data} setMusic={setMusic} />
      <div className={css.array}>
         <PlaylistArray user={user} playlists={playlists}/>
      </div>
    </div>
    
    
  )
};
