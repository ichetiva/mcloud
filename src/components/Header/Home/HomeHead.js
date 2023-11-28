import LoadingSM from '../../loadingScreen/loading'
import css from './HomeHead.module.css'

export const HomeHead = ({user}) => {
    if(user.data){
    return (
        <div className={css.block}>
            <h1>Welcome back {user.data.username}</h1>
        </div>
        
    )  
    } else {
        
    return (
        <div className={css.block}>
        <LoadingSM width="30px" height="30px" />
        </div> 
    )  
    }
    
}