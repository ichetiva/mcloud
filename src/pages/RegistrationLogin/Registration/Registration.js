import css from './Registration.module.css'
import { Link } from 'react-router-dom'
import Switch from '../Switch'
import { useState } from 'react'
import RegistrationPost from '../../../api/auth/login'

export const Registration = () => {
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    
    const LoginClean = document.getElementById('login')
    const PasswordClean = document.getElementById('password')
    const RepeatPasswordClean = document.getElementById('RepeatPassword')

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }

    return(
        <div className={css.form}>
            <div className={css.block}>
                <Link to='/'>To home(Temporary)</Link>
                <h1>SignUp Form</h1>
                <Switch />

                <input onChange={event => setMail(event.target.value)}
                type='email' placeholder='Email'/>
                <input onChange={event => setUsername(event.target.value)}
                type='login' id='login' placeholder='Login'/>
                <input onChange={event => setPassword(event.target.value)}
                type='password' id='password' placeholder='Password'/>
                <input onChange={event => setPasswordRepeat(event.target.value)}
                type='password' id='RepeatPassword' placeholder='Password'/>

                <button className={css.button} onClick={() => {if(password === passwordRepeat && isValidEmail(mail) === true && password !== '' && username !== '')
                {    
                    RegistrationPost(username, mail, password)
                }
                else{ 
                    alert('Required information is not filled')
                    LoginClean.value = ''
                    PasswordClean.value = ''
                    RepeatPasswordClean.value = ''

                    
                }}}> Login 
                </button>
                
            </div>
        </div>
    )
}