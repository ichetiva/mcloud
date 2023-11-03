import { useState } from 'react'
import css from '../AddNewTrack/AddMusic.module.css'

export const AddMusic = ({ closeModal }) => 
{
    const [image, setImage] = useState('https://i.pinimg.com/originals/74/2f/fe/742ffe1b2629fd606c8341ee93921cf9.gif')

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
           
        }
    }
    
    return (
        <>
        <div className={css.block}>
            <div className={css.background} onClick={() => closeModal()} ></div>
            <div className={css.form} >
                <div className={css.close} onClick={() => closeModal()}></div>
                <input id='poster' className={css.input} onChange={onImageChange} type='file'></input>
                <label className={css.poster} for='poster'>
                    <div className={css.posterHover}>Upload track</div> <img src={image} className={css.picture}></img>
                </label>

                <input id="track" className={css.input} type='file' ></input>
                <label className={css.track} for="track"> Insert track</label>
                
                <input className={css.title} type='name'></input>
            </div>
        </div>
        </>
    )
}
