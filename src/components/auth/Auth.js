import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeUser } from '../../ducks/userReducer'
import './Auth.css'

function Auth(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleRegisterUser = () => {
        const body = {
            author_id: props.dota_users_id,
            username: username,
            password: password,
            email: email,
            profile_pic: props.profile_pic
        }
        axios.post('/user/register', body).then(res => {
            console.log('redux data:', res.data)
            props.makeUser(res.data)
        }).catch(err => alert(`That Username is Taken! ${err}`))
    }

    const handleLoginUser = () => {
        const body = {
            username: username,
            password: password
        }
        axios.post('/user/login', body).then(res => {
            console.log('loginUser data??', res.data)
            props.makeUser(res.data)
        }).catch(err => alert(`Username or Password is incorrect! ${err}`))
    }

    return (
        <div className='main-auth-div'>
            <div className='child-auth-div'>
                <input placeholder='email'
                    onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='username'
                    onChange={e => setUsername(e.target.value)} />
                <input placeholder='password'
                    onChange={e => setPassword(e.target.value)}
                    type='password' required />
                    <div>
                <Link to='/'>
                    <button className='auth-buttons'
                        onClick={() => handleLoginUser()}>Login</button>
                </Link>
                    <Link to='/'>
                        <button className='auth-buttons'
                            onClick={() => handleRegisterUser()}>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// {props.isLoggedIn === false ? <Link to='/'>
//                         <button className='auth-buttons'
//                             onClick={() => handleRegisterUser()}>Register</button>
//                     </Link> : <h1>LOLBROKEN</h1>}


{/* <Link to='/'>
    <button className='auth-buttons'
        onClick={() => handleRegisterUser()}>Register</button>
</Link> */}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { makeUser })(Auth)