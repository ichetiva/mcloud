import css from './Switch.module.css'
import { Link } from 'react-router-dom'

export const Switch = () => {
    return(
        <div className={css.links}>
      <Link className={css.link} onClick={() => {
        sessionStorage.setItem('ButtonState', true)
      }} to="/SignIn">
        <div className={css.login}>Login</div>
      </Link>
      <Link className={css.link} onClick={() => {
        sessionStorage.setItem('ButtonState', false)
      }} to="/SignUp">
        <div className={css.signup}>SignUp</div>
      </Link>
    </div>
    )
}