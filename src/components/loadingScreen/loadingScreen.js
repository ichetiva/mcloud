import { isVisible } from '@testing-library/user-event/dist/utils'
import css from './loadingScreen.module.css'
import { Spinner } from 'react-bootstrap'


export const Loading = () => {
    return(
    <div className={css.background}>
         <span className={css.loader}></span>
    </div>
    )
}