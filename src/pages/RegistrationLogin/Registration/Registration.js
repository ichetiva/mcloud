import css from './Registration.module.css'
import Switch from '../Switch'
import { useState } from 'react'
import RegistrationPost from '../../../api/auth/registration'
import LoginPost from '../../../api/auth/login'
import { useNavigate } from 'react-router-dom'
export const Registration = () => {
    const navigate = useNavigate();

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

    async function RegistrationProcess(){
        let UserNameFormat = 'username'
        await RegistrationPost(username, mail, password)
        await LoginPost(username, password, UserNameFormat)
        refreshPage()
        navigate("/")
    }

    function refreshPage() {
        window.location.reload(false);
    }

    


    return(
        <div className={css.form}>
            <div className={css.block}>
                <Switch />
                <input autocomplete="off" onChange={event => setMail(event.target.value)}
                type='email' placeholder='Email'/>
                <input autocomplete="off" onChange={event => setUsername(event.target.value)}
                type='login' id='login' placeholder='Login'/>
                <input autocomplete="off" onChange={event => setPassword(event.target.value)}
                type='password' id='password' placeholder='Password'/>
                <input autocomplete="off" onChange={event => setPasswordRepeat(event.target.value)}
                type='password' id='RepeatPassword' placeholder='Password'/>

                <button className={css.button} onClick={() => {if(password === passwordRepeat && isValidEmail(mail) === true && password !== '' && username !== '')
                {      
                    RegistrationProcess()
                }
                else{ 
                    alert('Required information is not filled')
                    LoginClean.value = ''
                    PasswordClean.value = ''
                    RepeatPasswordClean.value = ''
                }}}> SignUp
                </button>
                
            </div>
        </div>
    )
}