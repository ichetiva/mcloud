import css from "./track.module.css"

export const Track = ({track, id}) => {
  
  if(track){
    return(
      <div className={css.songs}>
        <div className={css.ids}>{id + 1}</div>
        
          <div className={css.poster} style={{backgroundImage: `url(${track.poster_url})`}}>
          <div className={css.playbutton}></div>
          
          
        </div>
        <div className={css.label}>
          <div className={css.title}>{track.title}</div>
          <div className={css.author}>{track.user_id}</div>
        </div>
        <div className={css.date}>{track.updated_at}</div>
        <div className={css.heart}></div>
        <div className={css.time}></div>
        <div className={css.settings}></div>
    </div>
  )
  }
}