
import css from './PlaylistConstructor.module.css'


export const PlConstructor = ( {closeTab}) => { 

    
    return(
        <div className={css.block}>
            <div className={css.container}>
                <div className={css.background}></div>
                <div className={css.form}>
                    <div className={css.close} onClick={() =>{ closeTab()}}></div>
                    <div className={css.leftPt}>
                        <div className={css.poster}>
                            <div className={css.image}></div>
                        </div>
                        <div className={css.text}></div>
                    </div>
                    <div className={css.rightPt}>
                        <h1>Add songs</h1>
                    </div>
                </div>
            </div>
        </div>
        
    )
}