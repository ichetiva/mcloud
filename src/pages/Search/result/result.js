import css from './result.module.css'
import Track from '../../../schema/trackSample'
import AllTracks from '../../../schema/trackHomeSample'
export const GetResult = ({searchData, setMusic}) => {

    let database = searchData.data
    if(Object.keys(database)?.length > 0) {
        return (
        <div className={css.block}>
            <div className={css.hashtag}>
                    <div className={css.id}>id</div>
                    <div className={css.posterBlock}>poster</div>
                    <div className={css.labels}>text</div>
                    <div className={css.album}>album</div>
                    <div className={css.time}>time</div>
            </div>
            {Object.entries(database).map((track, index) => (
                <AllTracks key={index} track={track[1]} id={index} setMusic={setMusic}/>
            ))}
        </div>
    )
    }
    
}