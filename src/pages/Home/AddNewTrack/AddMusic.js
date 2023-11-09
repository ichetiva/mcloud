import { useState } from 'react'
import css from '../AddNewTrack/AddMusic.module.css'
import TrackCreatePost from '../../../api/PostTrack/PostTrack'
export const AddMusic = ({ closeModal }) => 
{
    const altPicture = 'https://i.pinimg.com/originals/74/2f/fe/742ffe1b2629fd606c8341ee93921cf9.gif'

    const [imageBlub, setImageBlub] = useState(altPicture)
    const [image, setImage] = useState(null)
    const [track, setTrack] = useState(null)
    const [label, setLabel] = useState('')
    const [color, setColor] = useState('#6d4c4c')
    
    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            setImageBlub(URL.createObjectURL(event.target.files[0])) 
            let file = event.target.files[0];
            setImage(file) 
        }
    }
    const onTrackChange =(event) => {
        if(event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            setTrack(file)
            setColor("green")
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
                    <div className={css.posterHover}>Upload track</div> <img src={imageBlub} alt="" className={css.picture}></img>
                </label>

                <input id="track" className={css.input} type='file' onChange={onTrackChange}></input>
                <label className={css.track} style={{backgroundColor: color}} for="track"> Insert track</label>
                
                <input className={css.title} type='name' onChange={event => {
                    setLabel(event.target.value)
                }}></input>

                <div className={css.button} onClick={() => {

                    if(image !== altPicture && track && label){
                        TrackCreatePost(label, image, track)
                        console.log({label, image, track})
                        
                    } else {
                        alert("Something is missing, check again")
                    }
                }}>Submit song</div>
            </div>
        </div>
        </>
    )
}
