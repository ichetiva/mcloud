import css from './Login.module.css'
import Switch from '../Switch'
import { Link } from 'react-router-dom'

export const Login = () => {
    return(
        <div className={css.form}>
            <div className={css.block}>
                <h1>Login Form</h1>
                <Switch />
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='Password'/>
                <button> Login </button>
                <div className={css.transfer}>
                    <a>Still not member?</a>
                    <Link className={css.signup} to='/SignUp'>SignUp now</Link>
                </div>
            </div>
        </div>
    )
}