import css from './result.module.css'
import Track from '../../../schema/trackSample'
export const GetResult = ({searchData}) => {

    let database = searchData.data
    console.log(database)
    if(Object.keys(database)?.length > 0) {
        return (
        <div className={css.block}>
            {Object.entries(database).map((track) => (
                <Track track={track[1]} />
            ))}
        </div>
    )
    }
    
}