import { useState } from 'react'
import css from '../AddNewTrack/AddMusic.module.css'
import TrackCreatePost from '../../../api/PostTrack/PostTrack'
import Loading from '../../../components/loadingScreen'



export const AddMusic = ({ closeModal , openAlert , alertPropsChange }) => 
{
    const altPicture = 'https://i.pinimg.com/originals/74/2f/fe/742ffe1b2629fd606c8341ee93921cf9.gif'
    let fileInput = document.getElementById("track")
    function CheckEmpty() {
        if(fileInput){
            fileInput.addEventListener("change", function () {
            if(fileInput.files.length != 0){
                setButtonColor("rgb(95, 133, 219, 0.4)")
            }
        })}
    }
    const [buttonColor, setButtonColor] = useState('#26282B')
    const [imageBlub, setImageBlub] = useState(altPicture)
    const [image, setImage] = useState(null)
    const [track, setTrack] = useState(null)
    const [label, setLabel] = useState('')
    const [color, setColor] = useState('../../../assets/Icons/downloadIcon.svg')
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
    const onTrackChange =(event) => {
        if(event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            setTrack(file)
            setButtonColor("rgb(95, 133, 219, 0.4)")
            setColor('../../../assets/Icons/check mark1.svg')
        }
    }

    return (
        <> 
        <div className={css.block}>
            <div className={css.background} onClick={() => closeModal()} ></div>
            { loading && <Loading /> }
            <div className={css.form} >
                <div className={css.close} onClick={() => closeModal()}></div>

                <div className={css.pictureNav}>
                    <div className={css.pictureBlock}>
                        <input id='poster' className={css.input} onChange={onImageChange} type='file'></input>
                        <label className={css.poster} for='poster'>
                            <div className={css.posterHover}>Upload track</div> <img src={imageBlub} alt="" className={css.picture}></img>
                        </label>
                        
                        <div className={css.insertNav}>
                        <input id="track" className={css.input}  type='file' onChange={onTrackChange}></input>
                        <label className={css.track} style={{backgroundColor: buttonColor}} for="track">
                            Insert track
                        </label>
                    </div>
                    </div>
                </div>
                <div className={css.rightside}>
                    

                    <input className={css.title} type='name' onChange={event => {setLabel(event.target.value)}}></input>

                    <div className={css.button} onClick={async () => {
                            if(image && track && label)
                            {
                                const response = await TrackCreatePost(label, image, track, startLoad, stopLoad, closeModal)
                                if(response.status === 200){
                                openAlert()
                                alertPropsChange(["Upload " , "Your track is succesfully uploaded!"])
                                } else {
                                openAlert()
                                alertPropsChange(["Upload Notification", "Something went wrong"])
                                }

                            } else {
                                alert("Something is missing, check again")
                            }
                        }}>Submit song
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
