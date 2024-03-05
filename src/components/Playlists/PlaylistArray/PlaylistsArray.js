import css from './Playlist.module.css'
import LoadingSM from '../../loadingScreen/loading'
import PostLikedPlaylist from '../../../api/Playlists/Favorite/PostLikedPlaylist'

export const PlaylistArray = () => {
  /*  
    const fileInput = document.getElementById('fileUp');
    console.log(fileInput)
    fileInput.addEventListener('change', function() {
      const file = fileInput.files[0];
      console.log(file);
    });*/ 
    
    const musicData = true
   
 
   
       // eslint-disable-next-line no-lone-blocks
       {if(/* musicData.data */  musicData === false){
        /*
            const database = musicData.data
            if(Object.keys(database)?.length > 0) {
            return (
            <div className={css.grid}>
                {Object.entries(database).map((track, index) => (
                    <PlaylistTable key={index} track={track[1]} id={index} setMusic={setMusic} />
                ))}
            </div>
        )
        }
    */}
    
 else {
 return <div className={css.loading}>
             <h3>Working on it....</h3>
             <LoadingSM width="55px" height="55px"/>
             <button style={{width: "60px", height:"20px"}} onClick={() => {PostLikedPlaylist()}}>Post</button>
        </div> 
}
       
    }}