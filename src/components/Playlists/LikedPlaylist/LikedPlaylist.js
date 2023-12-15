import css from './LikedPlaylist.module.css'
import LoadingSM from '../../loadingScreen/loading'

export const LikedPlaylist = ({user}) => {
    /*const name = () => {
        if(user.data){
          return (user.data.username)
    
        } else {
          return <LoadingSM width='5px' height='5px' />
        }
      } */
    
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