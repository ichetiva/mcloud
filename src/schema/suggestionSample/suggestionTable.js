import css from './suggestionTable.module.css'

export const SuggestionTracks = ({track, id, setMusic}) => {
  if(track){
    return(
        <div className={css.songs}>
          <div className={css.ids}>{id + 1}</div>
            <div className={css.poster} style={{backgroundImage: `url(${track.poster_url})`}} onClick={() => {setMusic(track.track_url)}}>
               <div className={css.shadow}>
                  <div className={css.playbutton}></div>
                </div>
            </div>
          <div className={css.label}>
            <div className={css.title}>{track.title}</div>
            <div className={css.author}>{track.user_id}</div>
          </div>
          <div>add</div>
        </div>
    
  )
  }
}