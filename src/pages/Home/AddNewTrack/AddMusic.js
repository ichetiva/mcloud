import css from '../AddNewTrack/AddMusic.module.css'

export const AddMusic = ({ closeModal }) => 
{
   
    
    return (
        <>
        <div className={css.block}>
            <div className={css.background} onClick={() => closeModal()} ></div>
            <div className={css.form} >
                <div className={css.close} onClick={() => closeModal()}></div>
                <input className={css.icon} type='file'></input>
                <div className={css.title}></div>
            </div>
        </div>
        </>
    )
}
