import css from './Playlist.module.css'
import LoadingSM from '../../loadingScreen/loading'
import { PlaylistTable } from '../../../schema/playlistSample/playlistTable'
export const PlaylistArray = ({user, playlists}) => {
  /*  
    const fileInput = document.getElementById('fileUp');
    console.log(fileInput)
    fileInput.addEventListener('change', function() {
      const file = fileInput.files[0];
      console.log(file);
    });*/ 
    
    if(user.data && playlists.data){
      const playlistData = playlists.data
      const database = playlistData
            if(Object.keys(database)?.length > 0) {
            return (
            <div className={css.grid}>
                {Object.entries(database).map((playlist, index) => (
                    <PlaylistTable key={index} playlist={playlist[1]} id={index} user={user} />
                ))}
            </div>
        )
        }
    }
 
 else {
 return <>
        <div className={css.loading}>
             <h3>Working on it....</h3>
             <LoadingSM width="55px" height="55px"/>
        </div> 
        
        
        </>
}
       
    }