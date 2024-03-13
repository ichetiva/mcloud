import SuggestionTracks from '../../../../../schema/suggestionSample'
import css from './suggestionMusic.module.css'
export const GetSuggestionMusic = ({musicData, setMusic}) => {
    if(musicData.data){
        const database = musicData.data
        if(Object.keys(database)?.length > 0) {
        return (
        <div className={css.grid}>
            {Object.entries(database).map((track, index) => (
                <SuggestionTracks key={index} track={track[1]} id={index} setMusic={setMusic} />
            ))}
        </div>
    )
    }
    }    
}
    
    


