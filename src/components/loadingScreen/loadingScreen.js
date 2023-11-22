import css from './loadingScreen.module.css'

export const Loading = () => {
    return(
    <div className={css.background}>
         <span className={css.loader}></span>
    </div>
    )
}