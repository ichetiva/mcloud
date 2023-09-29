import React from "react";
import css from "./PlaylistListItem.module.css";

export const PlaylistListItem = ({ playlist }) => {
  return (
    <div className={css.playlist}>
      <div className={css.poster}></div>
      <div className={css.name}>{playlist.name}</div>
      <div className={css.description}>{playlist.description}</div>
    </div>
  );
};
