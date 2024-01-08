import css from './playlistTable.module.css'

export const PlaylistTable = () => {
    return (
        <div className={css.favorite}>
          <div className={css.poster}>
            <div className={css.iconBack}>
              <div className={css.icon}></div>
            </div>
          </div>
          <div className={css.label}>
            <h3>Liked songs</h3>
            <div className={css.params}>
              <b></b>
            </div>
          </div>
        </div>
        
      )
} 