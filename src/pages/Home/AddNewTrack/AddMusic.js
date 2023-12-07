import { useState } from 'react'
import css from '../AddNewTrack/AddMusic.module.css'
import TrackCreatePost from '../../../api/PostTrack/PostTrack'
import Loading from '../../../components/loadingScreen'



export const AddMusic = ({ closeModal , openAlert , alertPropsChange }) => 
{
    const altPicture = 'https://i.pinimg.com/originals/74/2f/fe/742ffe1b2629fd606c8341ee93921cf9.gif'
    
    
    const [buttonColor, setButtonColor] = useState('#00b2ff')
    const [imageBlub, setImageBlub] = useState(altPicture)
    const [image, setImage] = useState(null)
    const [track, setTrack] = useState(null)
    const [label, setLabel] = useState('')
    const [color, setColor] = useState('../../../assets/Icons/downloadIcon.svg')
    const [loading, setLoading] = useState(false)
    const policy = document.getElementById('policy')

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
    const createTrack = async () => {
        if(image && track && label && policy.checked)
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
                    <input className={css.title} placeholder='Label'type='name' minLength='3' maxLength='40' onChange={event => {setLabel(event.target.value)}}></input>
                    
                    <textarea className={css.description} placeholder='Description (free to fill / not used anywhere now)' maxLength='200'  onChange={event => {setLabel(event.target.value)}}></textarea>
                    </div>
                </div>
                <div className={css.rightside}>
                    <div className={css.instructionsMenu}>
                        <h3>Rules</h3>
                        <h4>Poster</h4>
                            <b>Allowed formats: jpg / jpeg</b>
                            <b>Allowed size: ?</b>
                            <b>Allowed ratio: 800x800, etc...</b>                     
           
                        <h4>Track file</h4>                   
                            <b>Allowed formats: mp3</b>
                            <b>Allowed size: 5mb?{`<`} </b>
                            <b>Allowed content: only censored content</b>
                                        
                        <h4>Label</h4>                       
                            <b>Allowed lenght: 50 symbols</b>
                            <b>Not allowed: ban words, racist words</b>
                            <b>Copyright ban</b>                    

                        <h4>Description</h4>                  
                            <b>Allowed lenght: 200 symbols</b>
                            <b>Not allowed: ban words, racist words</b>
                            <b>*Currently not used*</b>
                         
                    </div>
                    <div className={css.policy}>
                        <input className='policy' type="checkbox" id="policy" name="policy" />
                        <label for="policy"> I accept rules</label>
                    </div>
                    
                    <div className={css.button} onClick={async () => {createTrack()}}>Submit song
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
