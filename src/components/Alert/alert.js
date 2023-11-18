import { useState } from 'react'
import css from './alert.module.css'

export const Alert = ({title, description, close}) => {
    
    const [shown, setShown] = useState(true)
    setTimeout(() => {
        setShown(false)
        close()
    }, 5000)
    return ( 
    shown &&
    
        <div className={css.block} onClick={() => {setShown(false)}}>
            <div className={css.title}>
                <h1>{title}</h1>
                <div className={css.icon}></div>
            </div>
            <div className={css.description}><h3>{description}</h3></div>
        </div>   
    
    )
}