import css from './Registration.module.css'
import { Link } from 'react-router-dom'
import Switch from '../Switch'
import { useState } from 'react'
export const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }

    return(
        <div className={css.form}>
            <div className={css.block}>
                <Link to='/'>To home(Temporary)</Link>
                <h1>SignUp Form</h1>
                <Switch />

                <input onChange={event => setUsername(event.target.value)}
                type='email' placeholder='Email'/>
                <input onChange={event => setPassword(event.target.value)}
                type='password' placeholder='Password'/>
                <input onChange={event => setPasswordRepeat(event.target.value)}
                type='password' placeholder='Password'/>

                <button className={css.button} onClick={() => {if(password === passwordRepeat && isValidEmail(username) === true && password !== ''){console.log([username, password, passwordRepeat])
                }else{alert("you ducked up")}}}> Login 
                </button>
                
            </div>
        </div>
    )
}