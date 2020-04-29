import React, {useState} from 'react'
import './Auth.css'

function Auth() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    return (
        <div className='main-auth-div'>
            <input placeholder ='email'
                onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder ='username'
                onChange={e => setUsername(e.target.value)}/>
            <input placeholder ='password'
                onChange={e => setPassword(e.target.value)}/>
                <button>Login</button>
                <button>Register</button>
            Auth.jsewerwerwerwefwef
        </div>
    )
}

export default Auth