import css from './Playlist.module.css'
import PlaylistTable from '../../../schema/playlistSample'
import LoadingSM from '../../loadingScreen/loading'
export const PlaylistArray = () => {
   
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
        </div> 
}
       
    

 
    }}