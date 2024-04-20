import { useState } from 'react'
import css from './PlaylistConstructor.module.css'
import GetSuggestionMusic from './suggestionAdd'
import PostPlaylist from '../../../../api/Playlists/Favorite/PostPlaylist'
export const PlConstructor = ( {closeTab, data, setMusic}) => { 
    const altPicture = 'https://i.pinimg.com/originals/74/2f/fe/742ffe1b2629fd606c8341ee93921cf9.gif'
    const [imageBlub, setImageBlub] = useState(altPicture)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            setImageBlub(URL.createObjectURL(event.target.files[0])) 
            let file = event.target.files[0];
            setImage(file) 
        }
    }

    const createTrack = async () => {
        if(/*image && */ label)
                            {
                                const response = await PostPlaylist(image, label, description)
                               
                            } else {
                                alert("Something is missing, check again")
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
                        <div className={css.text}>
                            <div className={css.info}>
                                <input className={css.label} placeholder='title' onChange={(event) => {setLabel(event.target.value)}}></input>
                                <input className={css.description} placeholder='description' onChange={(event) => {setDescription(event.target.value)}}></input>
                            </div>
                            <div className={css.submit} onClick={() => {
                                createTrack()
                            }}>Submit</div>
                        </div>
                    </div>
                    <div className={css.rightPt}>
                     <GetSuggestionMusic musicData={data} setMusic={setMusic}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}