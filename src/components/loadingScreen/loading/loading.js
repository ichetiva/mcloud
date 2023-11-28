import css from './loading.module.css'

export const LoadingSM = ({width, height}) => {
    return(
    
         <span className={css.loader} style={{width: width, height: height}}></span>
    
    )
}

export default LoadingSM