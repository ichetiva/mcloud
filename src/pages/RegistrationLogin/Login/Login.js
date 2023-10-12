import css from './Login.module.css'
import Switch from '../Switch'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import LoginPost from '../../../api/auth/login'
export const Login = () => {
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const LoginClean = document.getElementById('login')
    const PasswordClean = document.getElementById('password')

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }

    function FormatCheck(UserNameFormat){
      
                    if (isValidEmail(username) === true){
                        UserNameFormat = 'email'
                        console.log(UserNameFormat)
                    } else {
                        UserNameFormat = 'username'
                        console.log(UserNameFormat)
                    }
                    return UserNameFormat
    }

    function refreshPage() {
        window.location.reload(false);
      }

    async function Logining() {
        
        
        let Login_type = FormatCheck()
        console.log(Login_type)
        await LoginPost(username, password, Login_type)
        refreshPage()
    }

    return(  
        <div className={css.form}>
            <div className={css.block}>
                <h1>Login Form</h1>
                <Switch />
                <input type='username' id='login' onChange={event => setUsername(event.target.value)} placeholder='Login or Email'/>
                <input type='password' id='password' onChange={event => setPassword(event.target.value)} placeholder='Password'/>
                <button onClick={() => {if(password !== '')
                {    
                   Logining()
                }
                else{ 
                    alert('Required information is not filled')
                    LoginClean.value = ''
                    PasswordClean.value = ''
                    }
                    }}> Login </button>
                <div className={css.transfer}>
                    <a>Still not member?</a>
                    <Link className={css.signUp} to='/SignUp'>
                        SignUp now
                    </Link>
                </div>
            </div>
        </div>
    )
}