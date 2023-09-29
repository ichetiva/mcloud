import React from "react";
import database from "../../data/playlistExample.json";
import PlaylistListItem from "../PlaylistListItem";
import css from "./Playlists.module.css";

export const Playlists = () => {
  if (Object.keys(database)?.length > 0) {
    return (
      <div className={css.playlists}>
        <div className={css.playlist}>
          {Object.entries(database).map((playlist) => (
            <PlaylistListItem playlist={playlist[1]} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="empty">
        <h2>Add playlists here</h2>
      </div>
    );
  }
};
