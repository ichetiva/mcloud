import css from './result.module.css'
import Track from '../../../schema/trackSample'
export const GetResult = ({searchData, setMusic}) => {

    let database = searchData.data
    if(Object.keys(database)?.length > 0) {
        return (
        <div className={css.block}>
            {Object.entries(database).map((track, index) => (
                <Track key={index} track={track[1]} id={index} setMusic={setMusic}/>
            ))}
        </div>
    )
    }
    
}