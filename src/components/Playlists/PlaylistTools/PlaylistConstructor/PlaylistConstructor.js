import { useState } from 'react'
import css from './PlaylistConstructor.module.css'


export const PlConstructor = ( {closeTab}) => { 
    const altPicture = 'https://i.pinimg.com/originals/74/2f/fe/742ffe1b2629fd606c8341ee93921cf9.gif'
    const [imageBlub, setImageBlub] = useState(altPicture)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const startLoad = () => {
        setLoading(true)
    }
    const stopLoad = () => {
        setLoading(false)
    }

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            setImageBlub(URL.createObjectURL(event.target.files[0])) 
            let file = event.target.files[0];
            setImage(file) 
        }
    }

    return(
        <div className={css.block}>
            <div className={css.container}>
                <div className={css.background}></div>
                <div className={css.form}>
                    <div className={css.close} onClick={() =>{ closeTab()}}></div>
                    <div className={css.leftPt}>
                        <div className={css.posterBox}>
                            <div className={css.image}>
                                <input id='poster' className={css.input} onChange={onImageChange} type='file'></input>
                                <label className={css.poster} for='poster'>
                                    <img src={imageBlub} alt="" className={css.picture}></img>
                                </label>
                            </div>
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