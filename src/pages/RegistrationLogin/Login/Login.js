import css from './Login.module.css'
import Switch from '../Switch'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }

    return(  
        <div className={css.form}>
            <div className={css.block}>
                <Link to='/'>To home(Temporary)</Link>
                <h1>Login Form</h1>
                <Switch />
                <input type='email' onChange={event => setUsername(event.target.value)} placeholder='Email'/>
                <input type='password' onChange={event => setPassword(event.target.value)} placeholder='Password'/>
                <button onClick={() => {if(isValidEmail(username) === true && password !== ''){console.log([username, password])
                }else{alert("you ducked up")}}}> Login </button>
                <div className={css.transfer}>
                    <a>Still not member?</a>
                    <Link className={css.signUp} to='/SignUp'>SignUp now</Link>
                </div>
            </div>
        </div>
    )
}