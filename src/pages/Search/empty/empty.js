import css from './empty.module.css'

export const GetEmpty = () => {
    return (
        <div className={css.emptyBody}>
            <div className={css.icon}></div>
            <div className={css.text}>
                <h1>Look for something?</h1>
            </div>
        </div>
    )
}