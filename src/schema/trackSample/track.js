import css from "./track.module.css"

export const Track = ({id , poster, title, author , date , time}) => {
    return(
        <div className={css.songs}>
          <div className={css.ids}>{id}</div>
          <div className={css.poster}>
            {poster}
            <div className={css.playbutton}></div>
          </div>
          <div className={css.label}>
            <div className={css.title}>{title}</div>
            <div className={css.author}>{author}</div>
          </div>
          <div className={css.date}>{date}</div>
          <div className={css.heart}></div>
          <div className={css.time}>{time}</div>
          <div className={css.settings}></div>
      </div>
    )
}